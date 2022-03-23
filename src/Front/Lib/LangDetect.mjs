/**
 * Wrap 'i18next-browser-languagedetector' library to use as ES6 module in TeqFW on the front.
 *
 * @namespace TeqFw_I18n_Front_Lib_LangDetect
 */
if (window.i18nextBrowserLanguageDetector === undefined) {
    throw new Error(`
Add

<script type="application/javascript" src="./src/i18n-bld/i18nextBrowserLanguageDetector.js"></script>

to your startup HTML to use 'i18next-browser-languagedetector'.           
`);
}
const def = window.i18nextBrowserLanguageDetector;
export {
    def as default,
} ;
