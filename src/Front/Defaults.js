/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class TeqFw_I18n_Front_Defaults {

    /** @type {TeqFw_I18n_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_I18n_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_I18n_Shared_Defaults$: SHARED,
        }
    ) {
        // DEPS
        this.SHARED = SHARED;

        // MAIN
        Object.freeze(this);
    }
}
