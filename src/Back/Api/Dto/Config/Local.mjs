/**
 * Local configuration DTO for the plugin (i18n).
 * @see TeqFw_Core_Back_Config
 */
class TeqFw_I18n_Back_Api_Dto_Config_Local {
    /**
     * 'true' - all i18n resources will be re-scanned on every call to the loading service.
     * @type {Boolean}
     */
    devMode = false;
}

export {
    TeqFw_I18n_Back_Api_Dto_Config_Local as default,
};
