/**
 * Load i18n resources from server or local storage.
 */
// MODULE'S VARS
const KEY_PREFIX = '@teqfw/i18n/bundle';

// MODULE'S CLASSES
export default class TeqFw_I18n_Front_Mod_Loader {
    /**
     * @param {TeqFw_I18n_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Front_Mod_Config} modCfg
     * @param {TeqFw_I18n_Shared_Dto_Load} dtoLoad
     */
    constructor(
        {
            TeqFw_I18n_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Front_Mod_Config$: modCfg,
            TeqFw_I18n_Shared_Dto_Load$: dtoLoad,
        }) {
        // VARS
        let BASE;
        logger.setNamespace(this.constructor.name);

        // FUNCS
        /**
         * Load i18n resources for one language from the server.
         * @param {string} lang
         * @return {Promise<Object>}
         */
        async function loadFromServer(lang) {
            // FUNCS
            /**
             * Don't call this function in VARS section, because config is not loaded yet.
             * @return {string}
             * TODO: extract common code to util
             */
            function composeBaseUrl() {
                if (!BASE) {
                    const cfg = modCfg.get();
                    const schema = '//';
                    const domain = cfg.urlBase ?? location.hostname;
                    let port = location.port; // empty string for default ports (80 & 443)
                    if (port !== '') port = `:${port}`
                    const root = (cfg.root) ? `/${cfg.root}` : '';
                    const door = (cfg.door) ? `/${cfg.door}` : '';
                    const space = `/${DEF.SHARED.SPACE_LOAD}`;
                    BASE = `${schema}${domain}${port}${root}${door}${space}/`; // TODO: filter in service worker (???)
                }
                return BASE;
            }

            // MAIN
            let res;
            /** @type {TeqFw_I18n_Shared_Dto_Load.Dto} */
            const data = dtoLoad.createDto()
            data.lang = lang;
            const urlBase = composeBaseUrl();
            const resp = await fetch(`${urlBase}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (resp.status === 200) {
                // save loaded bundle into local storage
                const bundle = await resp.json();
                if (bundle) {
                    const key = `${KEY_PREFIX}/${lang}`;
                    window.localStorage.setItem(key, JSON.stringify(bundle));
                    res = bundle;
                }
            } else {
                const msg = `Error in i18n resources loading. Status: ${resp.status}.`;
                logger.error(msg);
            }
            return res ?? {};
        }

        function loadFromLocalStorage(lang) {
            const key = `${KEY_PREFIX}/${lang}`;
            const str = window.localStorage.getItem(key);
            return JSON.parse(str);
        }

        // INSTANCE METHODS
        /**
         * Get resources for one language. Load resources from local storage (if available) or from the server.
         * @param {string} lang
         * @return {Promise<Object>}
         */
        this.getLang = async function (lang) {
            let res;
            if (navigator.onLine) {
                const cfg = modCfg.get();
                res = loadFromLocalStorage(lang);
                const forceRemote = (cfg.devMode === true);
                if (!res || forceRemote) res = await loadFromServer(lang);
            } else res = loadFromLocalStorage(lang);
            return res || {};
        }

    }
}
