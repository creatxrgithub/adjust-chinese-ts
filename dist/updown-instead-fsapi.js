"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/updown-instead-fsapi.ts
var updown_instead_fsapi_exports = {};
__export(updown_instead_fsapi_exports, {
  createWriteStream: () => createWriteStream,
  default: () => updown_instead_fsapi_default
});
module.exports = __toCommonJS(updown_instead_fsapi_exports);
var import_native_file_system_adapter = require("native-file-system-adapter");
async function createWriteStream(path, options) {
  const fileHandle = await (0, import_native_file_system_adapter.showSaveFilePicker)({
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createWriteStream
});
