/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class TeqFw_I18n_Back_Defaults {

    DIR_BACK = 'back'; // subfolder to store i18n resources for backend scripts
    DIR_FRONT = 'front'; // subfolder to store i18n resources for frontend scripts
    DIR_I18N = 'i18n'; // root folder in plugin to store i18n resources (./i18n/front/lang.json)
    DIR_SHARED = 'shared'; // subfolder to store i18n resources for both backend and frontend scripts

    /** @type {TeqFw_Core_Back_Defaults} */
    MOD_CORE;
    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {TeqFw_I18n_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Core_Back_Defaults} MOD_CORE
     * @param {TeqFw_Web_Back_Defaults} MOD_WEB
     * @param {TeqFw_I18n_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Core_Back_Defaults$: MOD_CORE,
            TeqFw_Web_Back_Defaults$: MOD_WEB,
            TeqFw_I18n_Shared_Defaults$: SHARED,
        }
    ) {
        // DEPS
        this.MOD_CORE = MOD_CORE;
        this.MOD_WEB = MOD_WEB;
        this.SHARED = SHARED;

        // MAIN
        Object.freeze(this);
    }
}
