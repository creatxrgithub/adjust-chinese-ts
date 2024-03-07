/* not works when compile to commonjs
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
*/

import fs from 'fs';
import chardet from 'chardet';

//import iconv from 'iconv-lite';
//use return new TextDecoder(encoding).decode(buf) instead of iconv-lite cause it's not support "buffer" in browser.

import { standardT, contextT, symbolT, notRenameT, sectionT, daoistDefT, daoistT, daoistTokenT, abcT, traAdjustT, policsT, correctOcrT, dotT, encodingT } from './adjust_chinese_dict';
//error TS5097: An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled.


const dicts: any = { standardT, contextT, symbolT, notRenameT, sectionT, daoistDefT, daoistT, daoistTokenT, abcT, traAdjustT, policsT, correctOcrT, dotT, encodingT } ;



class ChineseAdjustor {
	fromT: (string|RegExp)[];
	toT: (string|RegExp)[];

	constructor(dictionaries: any) {
		this.fromT = [];
		this.toT = [];
		if(arguments.length==0) return;
		if(arguments[0]==null) return;
		for(let t=0; t<dictionaries.length; t++) {
//** 使用這段代碼以避免使用 eval() 函數（用以轉化字符串爲調用變量）
			let dict: any = '';
			if((typeof dictionaries[t]) === 'object') {
				dict = dictionaries[t];
			} else if((typeof dictionaries[t]) === 'string') {
				dict = dicts[dictionaries[t]];
			}
//** 使用這段代碼以避免使用 eval() 函數（用以轉化字符串爲調用變量）
//			for(let i=0; i<eval(dictionaries[t]).length; i++) {
			for(let i=0; i<dict.length; i++) {
				let oo: string | (string|RegExp)[] = [];
//				for(let o of eval(dictionaries[t])[i]) oo.push(o);  /** 這是分割單字的最好方法 */
//				oo = Array.from(eval(dictionaries[t])[i]);  /** 這是分割單字的最好方法 */
				oo = Array.from(dict[i]);  /** 這是分割單字的最好方法 */
				//設字符串 str='㗰𠳝' 分割單字可以使用 Array.from(str) 也可以使用 [...str] 但不能使用 str.split('')
				if(oo.length<2) continue;
				for(let j=1; j<oo.length; j++) {
					//this.fromT.push(new RegExp(oo[j],'ug'));
					//You should not escape the hyphen outside a character class in ES6 regex used with the u flag
					this.fromT.push(new RegExp(oo[j],'g'));
					this.toT.push(oo[0] as string);
				}
			}
		}
	}

	adjust(utf8str: string): string {
		if(utf8str==null) return '';
//		let newTxt =ChineseAdjustor.encodingToUtf8(str);
		let newTxt: string = utf8str;  //每次都要編碼太影響效率，要求輸入 utf8 編碼過的字串
		for(let i=0; i<this.fromT.length; i++) {
			newTxt = newTxt.replace(this.fromT[i], this.toT[i] as string);
		}
		return newTxt;
	}

	static encodingToUtf8(content: any): string {
		//const iconv = require('iconv-lite');
		//const chardet = require('chardet');  //這個比 jschardet 好用。jschardet 當傳入文件名字串時出錯，認作 ascii 了。
		//let buf = Buffer.from(content); //cannot use Buffer in browser, change to use Uint8Array
		let buf = new Uint8Array(content); //so that to use in browser
		let encoding: string = chardet.detect(buf) || '';
		console.log(encoding);
		/**
		 * 曾在 encoding=='utf8' 時，直接 return content 造成在 adjust 函數中 newTxt.replace() 調用錯誤，
		 * 似乎轉入的 content 失去了字串性質，由於讀入文本文件時沒有指定編碼（因爲不知道，需偵測）。
		 * 這種錯誤很不好查。小心！
		 * 但是，如果原文件是 utf8 𨿽不能調用 content.replace() 但卻能比較內容
		 * console.log(content==iconv.decode(buf, encoding));  //true
		 */
		//if(iconv.decode(buf, encoding)==content) console.log('pass');
		//奇怪，給輸入的 content 直接賦字串時，徵測到的 encoding 是 ascii 碼，轉換後等到空串！！！
		//return iconv.decode(buf, encoding) || '';
		return new TextDecoder(encoding).decode(buf) || '';
	}

	outputDictionary(fileName: string) {
		//const fs = require('fs');
		/** flags: 'as+': Open file for reading and appending in synchronous mode. The file is created if it does not exist. */
		/** https://nodejs.org/api/fs.html#fs_file_system_flags */
		let wstream = fs.createWriteStream(fileName, {flags:'as+'});
		for(let i=0; i<this.fromT.length; i++) {
			wstream.write(`${this.fromT[i]}=${this.toT[i]}\n`);
		}
		wstream.end();
		/**
		 * 這種寫法，當文件管理器剛好開在這個文件的寫入目錄時，可能造成文件管理器類似死機狀態，
		 * 使用流寫入就沒這個問題，由此可見效率差異。流寫入是異步的。
		 *
		for(let i=0; i<this.fromT.length; i++) {
			fs.writeFileSync(fileName, `${this.fromT[i]}=${this.toT[i]}\n`, {flag:'a'});
		}
		//*/
	}
}


export { ChineseAdjustor };
//export default ChineseAdjustor;

//error TS1203: Export assignment cannot be used when targeting ECMAScript modules. Consider using 'export default' or another module format instead.
//export = ChineseAdjustor;
