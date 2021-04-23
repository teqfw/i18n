/**
 * Data-object to represent plugin descriptor structure that is related to 'i18n' node:
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Api_Back_Plugin_Desc';

class TeqFw_I18n_Api_Back_Plugin_Desc {
    /**
     * 'true' - all i18n resources will be re-scanned on every call to the loading service.
     * @type {Boolean}
     */
    devMode = false;
}

Object.freeze(TeqFw_I18n_Api_Back_Plugin_Desc);

export {
    TeqFw_I18n_Api_Back_Plugin_Desc as default,
};
