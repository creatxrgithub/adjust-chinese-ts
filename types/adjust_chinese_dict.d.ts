declare const policsT: (string | (string | RegExp)[])[];
/**
 * OCR 文本常見錯誤
 */
declare const correctOcrT: (string | (string | RegExp)[])[];
/**
 * 給古文加標點
 */
declare const dotT: (string | (string | RegExp)[])[];
/**
 * 異體字比較傾向使用左右結構取代上下結構的，因左右結構的字體的筆畫間距較大，較容易識別。待議。此選擇僅爲个人傾向。
 */
declare const traAdjustT: (string | (string | RegExp)[])[];
declare const standardT: (string | (string | RegExp)[])[];
declare const daoistDefT: (string | (string | RegExp)[])[];
declare const daoistTokenT: (string | (string | RegExp)[])[];
declare let daoistT: (string | (string | RegExp)[])[];
declare const contextT: (string | (string | RegExp)[])[];
/**
 * 分卷標題起新行
 */
declare const sectionT: (string | (string | RegExp)[])[];
/**
 * 字母數字混編的字串用半角
 */
declare const abcT: (string | (string | RegExp)[])[];
declare const symbolT: (string | (string | RegExp)[])[];
declare const notRenameT: (string | (string | RegExp)[])[];
declare const encodingT: (string | (string | RegExp)[])[];
export { standardT, contextT, symbolT, notRenameT, sectionT, daoistDefT, daoistT, daoistTokenT, abcT, traAdjustT, policsT, correctOcrT, dotT, encodingT };
