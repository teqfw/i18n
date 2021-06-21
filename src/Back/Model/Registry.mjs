/**
 * Registry for I18N resources.
 *
 * @namespace TeqFw_I18n_Back_Model_Registry
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_Model_Registry';

class TeqFw_I18n_Back_Model_Registry {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_I18n_Defaults} */
        const DEF = spec['TeqFw_I18n_Defaults$']; // singleton
        /** @type {TeqFw_Core_App_Front_Data_Config} */
        const config = spec[DEF.MOD_CORE.DI_CONFIG]; // singleton
        /** @type {typeof TeqFw_I18n_Api_Shared_Config} */
        const CfgPlugin = spec['TeqFw_I18n_Api_Shared_Config#']; // class
        /** @function {@type TeqFw_I18n_Back_Model_Registry_A_Scan} */
        const aScan = spec['TeqFw_I18n_Back_Model_Registry_A_Scan$']; // singleton

        // DEFINE WORKING VARS
        /** @type {TeqFw_I18n_Api_Shared_Config} */
        const cfgPlugin = Object.assign(new CfgPlugin(), config.local[DEF.BACK_REALM]);
        /** @type {Object} all available i18n resource (lang/namespace/...)  */
        let registry;

        // DEFINE INNER FUNCTIONS
        async function scanPlugins() {
            if ((registry === undefined) || cfgPlugin.devMode) registry = await aScan();
        }

        // DEFINE INSTANCE METHODS
        this.getBundle = async function (lang, namespace = null) {
            let result = {};
            await scanPlugins(); // (re)scan plugins resources
            if (lang && registry[lang]) {
                if (namespace && registry[lang][namespace]) {
                    result = registry[lang][namespace];
                } else {
                    result = registry[lang];
                }
            }
            return result;
        }
    }
}

// MODULE'S EXPORT
export {
    TeqFw_I18n_Back_Model_Registry as default,
};
