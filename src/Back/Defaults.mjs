/**
 * Plugin constants (hardcoded configuration) for backend code.
 */
export default class TeqFw_I18n_Back_Defaults {

    DESC_NODE = 'i18n'; // node in 'teqfw.json' descriptors

    DIR_BACK = 'back'; // subfolder to store i18n resources for backend scripts
    DIR_FRONT = 'front'; // subfolder to store i18n resources for frontend scripts
    DIR_I18N = 'i18n'; // root folder in plugin to store i18n resources (./i18n/front/lang.json)
    DIR_SHARED = 'shared'; // subfolder to store i18n resources for both backend and frontend scripts

    /** @type {TeqFw_Core_Back_Defaults} */
    MOD_CORE;

    constructor(spec) {
        // EXTRACT DEPS
        this.MOD_CORE = spec['TeqFw_Core_Back_Defaults$'];

        // MAIN FUNCTIONALITY
        Object.freeze(this);
    }
}
