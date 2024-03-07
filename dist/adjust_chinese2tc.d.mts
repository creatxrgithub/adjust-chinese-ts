declare class ChineseAdjustor {
    fromT: (string | RegExp)[];
    toT: (string | RegExp)[];
    constructor(dictionaries: any);
    adjust(utf8str: string): string;
    static encodingToUtf8(content: any): string;
    outputDictionary(fileName: string): void;
}

export { ChineseAdjustor };
