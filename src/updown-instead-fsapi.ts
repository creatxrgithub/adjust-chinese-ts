/**
 * it's aim to instead "fs" module's methods in browser with configing in "package.json".
 * "browser": {
 *   "fs": "./src/updown-with-fsapi"
 * }
 * with this setting, "fs.createWriteStream()" means to download file.
 */
import { showSaveFilePicker } from 'native-file-system-adapter';



/*
class MyStream {
	stream: any = null;

	constructor(stream) {
		this.stream = stream;
	}

	write = async(data) => {
		//console.log('writing........................');
		await this.stream;
		await this.stream?.write(data);
	}

	end = async() => {
		await this.stream?.close();
	}
}
*/

export async function createWriteStream(path: string, options: any) {
	const fileHandle = await showSaveFilePicker({
			_preferPolyfill: false,
			suggestedName: 'untitled',
			excludeAcceptAllOption: false // default
		});
	//const wstream = await fileHandle.createWritable();
	//const retObj = new MyStream(wstream);
	const retObj = {
		stream: await fileHandle.createWritable(),

		async write(data: any) {
			//console.log('writing........................');
			//await this.stream;
			await this.stream?.write(data);
		},

		async end() {
			await this.stream?.close();
		}
	}
	return retObj;
}

export default {};  //must have this to export all as a module.
