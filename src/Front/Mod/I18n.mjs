/**
 * Model to encapsulate i18next functionality.
 */
export default class TeqFw_I18n_Front_Mod_I18n {
    /**
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_I18n_Front_Ext} extLib
     * @param {TeqFw_I18n_Front_Mod_Loader} modLoader
     */
    constructor(
        {
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_I18n_Front_Ext: extLib,
            TeqFw_I18n_Front_Mod_Loader$: modLoader,
        }
    ) {
        // VARS
        const _i18next = extLib.i18next;

        // INSTANCE METHODS
        /**
         * Get 'i18next' object.
         * @return {Object}
         */
        this.getI18n = function () {
            return _i18next;
        };

        /**
         * Get code for current language.
         * @return {string}
         */
        this.getLang = function () {
            return _i18next.language;
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
            await _i18next.init(options);
            // load resources for current language
            const lang = this.getLang();
            logger.info(`Current language: ${lang}`);
            const bundle = await modLoader.getLang(lang);
            for (const ns of Object.keys(bundle)) {
                _i18next.addResourceBundle(lang, ns, bundle[ns], true, true);
                logger.info(`Resource is added for selected language (lang:ns): ${lang}:${ns}`);
            }
            // load resources for fallback language
            if (lang !== fallback) {
                const bundle = await modLoader.getLang(fallback);
                for (const ns of Object.keys(bundle)) {
                    _i18next.addResourceBundle(fallback, ns, bundle[ns], true, true);
                    logger.info(`Resource is added for fallback language (lang:ns): ${fallback}:${ns}`);
                }
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
                _i18next.addResourceBundle(code, ns, bundle[ns], true, true);
            _i18next.changeLanguage(code);
        }
    }
}
