/**
 * Wrapper for 'i18next' library and it's plugins to use on frontend.
 *
 * @namespace TeqFw_I18n_Front_Model
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Front_Model';

export default class TeqFw_I18n_Front_Model {
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Web_Front_Service_Gate} */
        const gate = spec['TeqFw_Web_Front_Service_Gate$'];
        /** @type {TeqFw_I18n_Shared_Service_Route_Load.Factory} */
        const route = spec['TeqFw_I18n_Shared_Service_Route_Load#Factory$'];

        // DEFINE WORKING VARS / PROPS
        let i18next; // https://www.i18next.com/
        let i18nextBld; // https://github.com/i18next/i18next-browser-languageDetector

        // DEFINE INSTANCE METHODS
        this.getI18n = function () {
            return i18next;
        }

        /**
         * Get code for current language.
         * @return {string}
         */
        this.getLang = function () {
            return i18next.language;
        }

        /**
         * Initialize 'i18next' object.
         * @param {string[]} langs available languages (['en', 'es', 'ru', 'lv'])
         * @param {string} fallback fallback language code ('es', 'ru')
         * @param {Object} opts any other options available for 'i18next'
         * @return {Promise<void>}
         */
        this.init = async function (langs, fallback, opts = {}) {
            // init i18next
            const options = Object.assign({}, opts);
            options.supportedLngs = langs;
            options.fallbackLng = fallback;
            await i18next.init(options);
            // load resources for current language
            const lang = this.getLang();
            /** @type {TeqFw_I18n_Shared_Service_Route_Load.Request} */
            const req = route.createReq();
            req.lang = lang;
            const res = await gate.send(req, route);
            for (const ns of Object.keys(res))
                i18next.addResourceBundle(lang, ns, res[ns], true, true);
            // load resources for fallback language
            if (lang !== fallback) {
                req.lang = fallback;
                const res = await gate.send(req, route);
                for (const ns of Object.keys(res))
                    i18next.addResourceBundle(fallback, ns, res[ns], true, true);
            }
        }

        // MAIN FUNCTIONALITY
        const window = self;
        if (window.i18next) {
            i18next = window.i18next;
            // add plugin https://github.com/i18next/i18next-browser-languageDetector
            if (window.i18nextBrowserLanguageDetector)
                i18next.use(window.i18nextBrowserLanguageDetector);
        }
    }

}
