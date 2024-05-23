/**
 * The set of utilities provided by this plugin.
 */
export default class TeqFw_I18n_Shared_Util {
    /**
     * @param {TeqFw_I18n_Shared_Api_Config} i18nCfg
     */
    constructor(
        {
            TeqFw_I18n_Shared_Api_Config$: i18nCfg,
        }
    ) {
        /**
         * Get the value for default language/locale.
         * @param {Object<string,string>} values
         * @return {string}
         */
        this.getValueDef = function (values) {
            const lngDef = i18nCfg.getLangDefault();
            return values?.[lngDef];
        };
    }
}