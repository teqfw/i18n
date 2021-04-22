/**
 * Class to integrate plugin into TeqFW application.
 * @extends TeqFw_Core_App_Plugin_Init_Base
 */
export default class TeqFw_I18n_Plugin_Init {

    constructor(spec) {
        /** @type {TeqFw_I18n_Defaults} */
        const DEF = spec['TeqFw_I18n_Defaults$'];    // instance singleton

        this.getCommands = function () {
            return [];
        };

        this.getHttpStaticMaps = function () {
            return {
                '/vue/': '/vue/dist/',
            };
        };

        this.getServicesList = function () {
            return [
                'TeqFw_I18n_Back_Service_Some$',
            ];
        };

        this.getServicesRealm = function () {
            return DEF.BACK_REALM;
        };
    }


}
