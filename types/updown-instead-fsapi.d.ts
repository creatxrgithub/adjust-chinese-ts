export declare function createWriteStream(path: string, options: any): Promise<{
    stream: import("native-file-system-adapter").FileSystemWritableFileStream;
    write(data: any): Promise<void>;
    end(): Promise<void>;
}>;
declare const _default: {};
export default _default;
