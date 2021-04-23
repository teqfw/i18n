/**
 * Class to integrate plugin into TeqFW application.
 * @extends TeqFw_Core_App_Plugin_Init_Base
 */
export default class TeqFw_I18n_Plugin_Init {

    constructor(spec) {
        /** @type {TeqFw_I18n_Defaults} */
        const DEF = spec['TeqFw_I18n_Defaults$'];    // instance singleton

        this.getServicesRealm = function () {
            return DEF.BACK_REALM;
        };
    }


}
