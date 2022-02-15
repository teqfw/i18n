/**
 * Load i18n resources on the front.
 *
 * @namespace TeqFw_I18n_Back_WAPI_Load
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_WAPI_Load';

/**
 * @implements TeqFw_Web_Back_Api_WAPI_IFactory
 */
export default class TeqFw_I18n_Back_WAPI_Load {

    constructor(spec) {
        // DEPS
        /** @type {TeqFw_I18n_Back_Model_Registry} */
        const registry = spec['TeqFw_I18n_Back_Model_Registry$'];
        /** @type {TeqFw_I18n_Shared_WAPI_Load.Factory} */
        const route = spec['TeqFw_I18n_Shared_WAPI_Load#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // ENCLOSED FUNCS
            /**
             * @param {TeqFw_Web_Back_App_Server_Handler_WAPI_Context} context
             * @return Promise<void>
             */
            async function service(context) {
                /** @type {TeqFw_I18n_Shared_WAPI_Load.Request} */
                const req = context.getInData();
                /** @type {TeqFw_I18n_Shared_WAPI_Load.Response} */
                const res = context.getOutData();
                const lang = req.lang;
                const ns = req.namespace;
                const bundle = await registry.getFront(lang, ns);
                Object.assign(res, bundle);
            }

            // MAIN
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }

    }
}
