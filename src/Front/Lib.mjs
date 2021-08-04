/**
 * Wrapper for 'i18next' library and it's plugins to use on frontend.
 *
 * @see https://www.i18next.com/
 * @see https://github.com/i18next/i18next-browser-languageDetector
 *
 */
export default class TeqFw_I18n_Front_Lib {
    /** @type {TeqFw_Web_Front_Service_Gate} */
    #gate;
    /** @type {{init, language, use, addResourceBundle}} */
    #i18n;
    /** @type {TeqFw_I18n_Shared_Service_Route_Load.Factory} */
    #route;

    constructor(spec) {
        this.#gate = spec['TeqFw_Web_Front_Service_Gate$'];
        this.#route = spec['TeqFw_I18n_Shared_Service_Route_Load#Factory$'];
    }

    /**
     * Get 'i18next' object.
     * @return {Object}
     */
    getI18n() {
        return this.#i18n;
    }


    /**
     * Get code for current language.
     * @return {string}
     */
    getLang() {
        return this.#i18n.language;
    }

    /**
     * Set current language, load language resources if required.
     *
     * @param {string} code
     * @return {Promise<void>}
     */
    async setLang(code) {
        /** @type {TeqFw_I18n_Shared_Service_Route_Load.Request} */
        const req = this.#route.createReq();
        req.lang = code;
        const res = await this.#gate.send(req, this.#route);
        for (const ns of Object.keys(res))
            this.#i18n.addResourceBundle(code, ns, res[ns], true, true);
        this.#i18n.changeLanguage(code);
    }

    /**
     * Initialize 'i18next' object.
     *
     * @param {string[]} langs available languages (['en', 'es', 'ru', 'lv'])
     * @param {string} fallback fallback language code ('es', 'ru')
     * @param {Object} opts any other options available for 'i18next'
     * @return {Promise<void>}
     */
    async init(langs, fallback, opts = {}) {
        /** @type {{i18next, i18nextBrowserLanguageDetector}} */
        const window = self;
        if (window.i18next) {
            this.#i18n = window.i18next;
            // add plugin https://github.com/i18next/i18next-browser-languageDetector
            if (window.i18nextBrowserLanguageDetector)
                this.#i18n.use(window.i18nextBrowserLanguageDetector);
            // init i18next
            const options = Object.assign({}, opts);
            options.supportedLngs = langs;
            options.fallbackLng = fallback;
            await this.#i18n.init(options);
            // load resources for current language
            const lang = this.getLang();
            /** @type {TeqFw_I18n_Shared_Service_Route_Load.Request} */
            const req = this.#route.createReq();
            req.lang = lang;
            const res = await this.#gate.send(req, this.#route);
            for (const ns of Object.keys(res))
                this.#i18n.addResourceBundle(lang, ns, res[ns], true, true);
            // load resources for fallback language
            if (lang !== fallback) {
                req.lang = fallback;
                const res = await this.#gate.send(req, this.#route);
                for (const ns of Object.keys(res))
                    this.#i18n.addResourceBundle(fallback, ns, res[ns], true, true);
            }
        } else {
            console.log(`
Add '<script src="./src/i18n/i18next.min.js" type="application/javascript"></script>' to your startup HTML
to use 'i18next'.            
`);
        }
    }
}
