/**
 * Model to encapsulate i18next functionality.
 */
export default class TeqFw_I18n_Front_Mod_I18n {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_I18n_Front_Lib_I18next} */
        const i18next = spec['TeqFw_I18n_Front_Lib_I18next#'];
        /** @type {TeqFw_I18n_Front_Lib_LangDetect} */
        const i18bld = spec['TeqFw_I18n_Front_Lib_LangDetect#'];
        /** @type {TeqFw_I18n_Front_Mod_Loader} */
        const modLoader = spec['TeqFw_I18n_Front_Mod_Loader$'];

        // INSTANCE METHODS

        /**
         * Get 'i18next' object.
         * @return {Object}
         */
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
         *
         * @param {string[]} langs available languages (['en', 'es', 'ru', 'lv'])
         * @param {string} fallback fallback language code ('es', 'ru')
         * @param {Object} opts any other options available for 'i18next'
         * @return {Promise<void>}
         */
        this.init = async function (langs, fallback, opts = {}) {
            // add plugin https://github.com/i18next/i18next-browser-languageDetector
            i18next.use(i18bld);
            // init i18next
            const options = Object.assign({}, opts);
            options.supportedLngs = langs;
            options.fallbackLng = fallback;
            await i18next.init(options);
            // load resources for current language
            const lang = this.getLang();
            const bundle = await modLoader.getLang(lang);
            for (const ns of Object.keys(bundle))
                i18next.addResourceBundle(lang, ns, bundle[ns], true, true);
            // load resources for fallback language
            if (lang !== fallback) {
                const bundle = await modLoader.getLang(fallback);
                for (const ns of Object.keys(bundle))
                    i18next.addResourceBundle(lang, ns, bundle[ns], true, true);
            }
        }

        /**
         * Set current language, load language resources if required.
         *
         * @param {string} code
         * @return {Promise<void>}
         */
        this.setLang = async function (code) {
            const bundle = await modLoader.getLang(code);
            for (const ns of Object.keys(bundle))
                i18next.addResourceBundle(code, ns, bundle[ns], true, true);
            i18next.changeLanguage(code);
        }
    }
}
