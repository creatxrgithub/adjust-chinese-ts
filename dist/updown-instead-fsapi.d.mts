import * as native_file_system_adapter from 'native-file-system-adapter';

declare function createWriteStream(path: string, options: any): Promise<{
    stream: native_file_system_adapter.FileSystemWritableFileStream;
    write(data: any): Promise<void>;
    end(): Promise<void>;
}>;
declare const _default: {};

export { createWriteStream, _default as default };
