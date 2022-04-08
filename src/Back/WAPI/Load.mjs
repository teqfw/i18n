/**
 * Web API service to load i18n resources on the front.
 *
 * @namespace TeqFw_I18n_Back_WAPI_Load
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_WAPI_Load';

/**
 * @implements TeqFw_Web_Api_Back_Api_Factory_IService
 */
export default class TeqFw_I18n_Back_WAPI_Load {

    constructor(spec) {
        // DEPS
        /** @type {TeqFw_I18n_Back_Model_Registry} */
        const registry = spec['TeqFw_I18n_Back_Model_Registry$'];
        /** @type {TeqFw_I18n_Shared_WAPI_Load} */
        const endpoint = spec['TeqFw_I18n_Shared_WAPI_Load$'];

        // INSTANCE METHODS

        this.getEndpoint = () => endpoint;

        this.getService = function () {
            // FUNCS
            /**
             * @param {TeqFw_Web_Api_Back_Mod_Request_Context} context
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
            Object.defineProperty(service, 'namespace', {value: NS});
            return service;
        }

    }
}
