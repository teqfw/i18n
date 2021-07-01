/**
 * Load i18n resources on the front.
 *
 * @namespace TeqFw_I18n_Back_Service_Load
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_Service_Load';

/**
 * @implements TeqFw_Web_Back_Api_Service_IFactory
 */
export default class TeqFw_I18n_Back_Service_Load {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_I18n_Back_Model_Registry} */
        const registry = spec['TeqFw_I18n_Back_Model_Registry$'];
        /** @type {TeqFw_I18n_Shared_Service_Route_Load.Factory} */
        const route = spec['TeqFw_I18n_Shared_Service_Route_Load#Factory$'];

        // DEFINE INSTANCE METHODS
        this.getRouteFactory = () => route;

        this.getService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Web_Back_Api_Service_IContext} context
             * @return Promise<void>
             */
            async function service(context) {
                /** @type {TeqFw_I18n_Shared_Service_Route_Load.Request} */
                const req = context.getInData();
                /** @type {TeqFw_I18n_Shared_Service_Route_Load.Response} */
                const res = context.getOutData();
                const lang = req.lang;
                const ns = req.namespace;
                const bundle = await registry.getBundle(lang, ns);
                Object.assign(res, bundle);
            }

            // MAIN FUNCTIONALITY
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        }

    }
}
