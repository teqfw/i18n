/**
 * Registry for I18N resources.
 *
 * @namespace TeqFw_I18n_Back_Model_Registry
 */
export default class TeqFw_I18n_Back_Model_Registry {
    /**
     * @param {TeqFw_I18n_Back_Defaults} DEF
     * @param {TeqFw_Core_Back_Config} config
     * @param {TeqFw_Core_Back_Plugin_Dto_Config_Local} fCfg
     * @param {Function|TeqFw_I18n_Back_Model_Registry_A_Scan.action} aScan
     * @param {TeqFw_Core_Shared_Util_Cast.castBoolean|function} castBoolean
     */

    constructor(
        {
            TeqFw_I18n_Back_Defaults$: DEF,
            TeqFw_Core_Back_Config$: config,
            TeqFw_Core_Back_Plugin_Dto_Config_Local$: fCfg,
            TeqFw_I18n_Back_Model_Registry_A_Scan$: aScan,
            'TeqFw_Core_Shared_Util_Cast.castBoolean': castBoolean,
        }) {
        // DEFINE WORKING VARS
        /** @type {Object} all available backend i18n-resources (lang/namespace/...)  */
        let regBack;
        /** @type {Object} all available frontend i18n-resources (lang/namespace/...)  */
        let regFront;
        /** @type {TeqFw_Core_Back_Plugin_Dto_Config_Local} */
        const cfgPlugin = fCfg.createDto(config.getLocal(DEF.MOD_CORE.SHARED.NAME));
        const force = castBoolean(cfgPlugin.devMode); // force resources re-scan

        // FUNCS
        /**
         * Scan i18n resources if not scanned yet or re-scan is forced by configuration.
         * @param {boolean} force
         * @return {Promise<void>}
         */
        async function scanPlugins(force = false) {
            if (
                (regBack === undefined) ||
                (regFront === undefined) ||
                force
            ) {
                const {back, front} = await aScan();
                regBack = back;
                regFront = front;
            }
        }

        async function getBundle(registry, lang, namespace) {
            await scanPlugins(force); // (re)scan plugins resources
            if (lang && registry[lang]) {
                if (namespace && registry[lang][namespace]) {
                    return registry[lang][namespace];
                } else {
                    return registry[lang];
                }
            }
        }

        // INSTANCE METHODS

        /**
         * Scan i18n resources if not scanned yet.
         * @return {Promise<void>}
         */
        this.init = async function () {
            await scanPlugins(force);
        }

        /**
         * Get i18n resources for backend.
         * @param {string} lang language code in lower case ('en', 'en-us', 'zh-hant')
         * @param {string} namespace npm-package name ('project', '@scope/project', '@teqfw/i18n')
         * @return {Promise<Object>}
         */
        this.getBack = async function (lang, namespace = null) {
            return await getBundle(regBack, lang, namespace);
        }

        /**
         * Get i18n resources for frontend.
         * @param {string} lang language code in lower case ('en', 'en-us', 'zh-hant')
         * @param {string} namespace npm-package name ('project', '@scope/project', '@teqfw/i18n')
         * @return {Promise<Object>}
         */
        this.getFront = async function (lang, namespace = null) {
            return await getBundle(regFront, lang, namespace);
        }
    }
}
