/**
 * Load i18n resources from server or local storage.
 */
export default class TeqFw_I18n_Front_Mod_Loader {
    /**
     * @param {TeqFw_I18n_Front_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Front_Mod_Config} modCfg
     * @param {TeqFw_I18n_Front_Store_Local_Bundle} storeBundle
     * @param {TeqFw_I18n_Shared_Dto_Load} dtoLoad
     */
    constructor(
        {
            TeqFw_I18n_Front_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Front_Mod_Config$: modCfg,
            TeqFw_I18n_Front_Store_Local_Bundle$: storeBundle,
            TeqFw_I18n_Shared_Dto_Load$: dtoLoad,
        }
    ) {
        // VARS
        let BASE;

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
                    const schema = '//';
                    const cfg = modCfg?.get();
                    const domain = cfg?.urlBase ?? location.hostname;
                    let port = location.port; // empty string for default ports (80 & 443)
                    if (port !== '') port = `:${port}`;
                    const root = (cfg?.root) ? `/${cfg.root}` : '';
                    const door = (cfg?.door) ? `/${cfg.door}` : '';
                    const space = `/${DEF.SHARED.SPACE_LOAD}`;
                    BASE = `${schema}${domain}${port}${root}${door}${space}/`; // TODO: filter in service worker (???)
                }
                return BASE;
            }

            // MAIN
            let res;
            /** @type {TeqFw_I18n_Shared_Dto_Load.Dto} */
            const data = dtoLoad.createDto();
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
                    storeBundle.set(JSON.stringify(bundle), lang);
                    res = bundle;
                }
            } else {
                const msg = `Error in i18n resources loading. Status: ${resp.status}.`;
                logger.error(msg);
            }
            return res ?? {};
        }

        function loadFromLocalStorage(lang) {
            const str = storeBundle.get(lang);
            return JSON.parse(str);
        }

        // INSTANCE METHODS

        this.clearLocal = function () {
            storeBundle.clear();
            logger.info(`All locally stored i18n bundles are cleared.`);
        };

        /**
         * Get resources for one language. Load resources from local storage (if available) or from the server.
         * @param {string} lang
         * @return {Promise<Object>}
         */
        this.getLang = async function (lang) {
            let res = loadFromLocalStorage(lang);
            if (navigator.onLine) {
                const cfg = modCfg.get();
                const forceRemote = (cfg?.devMode === true);
                if (!res || forceRemote) res = await loadFromServer(lang);
            }
            return res || {};
        };

    }
}
