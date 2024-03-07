// src/updown-instead-fsapi.ts
import { showSaveFilePicker } from "native-file-system-adapter";
async function createWriteStream(path, options) {
  const fileHandle = await showSaveFilePicker({
    _preferPolyfill: false,
    suggestedName: "untitled",
    excludeAcceptAllOption: false
    // default
  });
  const retObj = {
    stream: await fileHandle.createWritable(),
    async write(data) {
      var _a;
      await ((_a = this.stream) == null ? void 0 : _a.write(data));
    },
    async end() {
      var _a;
      await ((_a = this.stream) == null ? void 0 : _a.close());
    }
  };
  return retObj;
}
var updown_instead_fsapi_default = {};
export {
  createWriteStream,
  updown_instead_fsapi_default as default
};
