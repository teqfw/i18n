/**
 * Application level constants (hardcoded configuration).
 */
export default class TeqFw_I18n_Defaults {
    // realm for API services ('/api/i18n/...') and CLI commands ('i18n-...')
    // must be equal to 'teqfw.json:http2.realm'
    BACK_REALM = 'i18n';

    DI = {
        I18N: 'coreI18n'
    };

    /** @type {TeqFw_Core_Defaults} */
    MOD_CORE;

    // SERVICES ROUTES
    SERV_load = '/load';

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_Core_Defaults} */
        // this.MOD_CORE = spec['TeqFw_Core_Defaults$']; // singleton

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
