/**
 * Model to encapsulate i18next functionality.
 */
export default class TeqFw_I18n_Front_Mod_I18n {
    /**
     * @param {TeqFw_I18n_Front_Ext} extLib
     * @param {TeqFw_I18n_Front_Mod_Loader} modLoader
     */
    constructor(
        {
            TeqFw_I18n_Front_Ext: extLib,
            TeqFw_I18n_Front_Mod_Loader$: modLoader,
        }
    ) {
        // INSTANCE METHODS
        const {i18next} = extLib;
        /**
         * Get 'i18next' object.
         * @return {Object}
         */
        this.getI18n = function () {
            return i18next;
        };

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
