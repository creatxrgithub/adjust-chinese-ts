# simple chinese to tradiction chinese 簡體轉繁體，或者說是簡化字轉正體字，及異體字擇用的工具包。

用 typescript 重寫了一次，以方便在如 ionic 的項目中使用。導入導出的方式作了點更改：
**const { ChineseAdjustor } = require** / **import { ChineseAdjustor } from**
~~const ChineseAdjustor = require~~

```

const { ChineseAdjustor } = require('adjust-chinese');

let tempT = [
  '个個箇',
  ['$1卷',/([破])捲/g],
  ['﹡','[＊]',/\*/]
];

/**
 * 預設的字典詞庫使用字符串指定，臨時自設的字典使用變量名轉入
 * {standardT, contextT, symbolT, notRenameT, sectionT, daoistDefT,
 *  daoistT, daoistTokenT, abcT, traAdjustT, policsT, correctOcrT, dotT, encodingT}
 * 字典中有些我自己的異體字擇用，比如：「个個箇」選「个」、「𨿽雖」選「𨿽」
 * 建議使用一點明體、花園字體或開心宋體閱讀轉換後的文本
 */
let dicts = ['abcT','traAdjustT','standardT','contextT','symbolT','notRenameT',tempT,['个個箇']];

let adjustor = new ChineseAdjustor(dicts);

let strOrg = '红楼梦个個箇';

//if strOrg is not encoding utf8
strOrg = ChineseAdjustor.encodingToUtf8(strOrg);

let strAdjusted = adjustor.adjust(strOrg);

console.log(strOrg, strAdjusted);


```

## static ChineseAdjustor.encodingToUtf8(str)

## useful script https://github.com/creatxrgithub/utils/blob/main/adjust_chinese2trad.js
## 我選漢字：https://github.com/creatxrgithub/articles/blob/master/%E5%8E%9F%E5%8A%8D.%E6%80%9D%E6%96%87.%E6%88%91%E9%81%B8%E6%BC%A2%E5%AD%97.txt

鍼對中英文混排預處理作一些更改：消除漢字間的空格，保留英文間及英文與漢字間的空格，不替換英文間的半角符號。

括號匹配仍會如前，將成對替換成「『』」，未能在正則表達式中預判是否處於英文或代碼的語境中，不能成對跳過不含漢字的括號對，故保持最小匹配的替換。

這些預處理是爲了將混亂的文本比如 OCR 的內容整理簡潔些再手工校對。
