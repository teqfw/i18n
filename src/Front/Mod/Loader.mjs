/**
 * Load i18n resources from server or local storage.
 */
// MODULE'S VARS
const KEY_PREFIX = '@teqfw/i18n/bundle';

// MODULE'S CLASSES
export default class TeqFw_I18n_Front_Mod_Loader {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_Web_Front_Dto_Config} */
        const cfg = spec['TeqFw_Web_Front_Dto_Config$'];
        /** @type {TeqFw_Web_Front_App_Connect_WAPI} */
        const wapi = spec['TeqFw_Web_Front_App_Connect_WAPI$'];
        /** @type {TeqFw_I18n_Shared_WAPI_Load.Factory} */
        const wapiLoad = spec['TeqFw_I18n_Shared_WAPI_Load.Factory$'];

        // FUNCS
        /**
         * Load i18n resources for one language from the server.
         * @param {string} lang
         * @return {Promise<Object>}
         */
        async function loadFromServer(lang) {
            /** @type {TeqFw_I18n_Shared_WAPI_Load.Request} */
            const req = wapiLoad.createReq();
            req.lang = lang;
            const res = await wapi.send(req, wapiLoad);
            const key = `${KEY_PREFIX}/${lang}`;
            window.localStorage.setItem(key, JSON.stringify(res));
            return res;
        }

        function loadFromLocalStorage(lang) {
            const key = `${KEY_PREFIX}/${lang}`;
            const str = window.localStorage.getItem(key);
            return JSON.parse(str);
        }

        // INSTANCE METHODS
        /**
         * Get resources for one language.
         * @param {string} lang
         * @return {Promise<Object>}
         */
        this.getLang = async function (lang) {
            let res;
            if (navigator.onLine) {
                const forceRemote = (cfg.devMode === true);
                if (forceRemote) res = await loadFromServer(lang);
                else res = loadFromLocalStorage(lang);
            } else res = loadFromLocalStorage(lang);
            return res || {};
        }

    }
}
