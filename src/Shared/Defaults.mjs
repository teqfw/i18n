/**
 * Plugin constants (hardcoded configuration) for shared code.
 */
export default class TeqFw_I18n_Shared_Defaults {
    DI_I18N = 'i18n'; // key to put/get i18n object to/from DI container

    NAME = '@teqfw/i18n';

    SRV = {
        LOAD: '/load'
    };

    constructor() {
        Object.freeze(this);
    }
}
