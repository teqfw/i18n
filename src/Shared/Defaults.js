/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_I18n_Shared_Defaults {

    NAME = '@teqfw/i18n';

    SPACE_LOAD = 'teq-i18n-load';

    /**
     * @type {string}
     * @deprecated
     */
    WAPI_LOAD = '/load';

    constructor() {
        Object.freeze(this);
    }
}
