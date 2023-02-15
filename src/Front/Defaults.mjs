/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class TeqFw_I18n_Front_Defaults {

    /** @type {TeqFw_I18n_Shared_Defaults} */
    SHARED ;

    constructor(spec) {
        // DEPS
        this.SHARED = spec['TeqFw_I18n_Shared_Defaults$'];

        // MAIN
        Object.freeze(this);
    }
}
