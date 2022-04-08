/**
 * Endpoint data for service to load i18n resources on the front.
 *
 * @namespace TeqFw_I18n_Shared_WAPI_Load
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Shared_WAPI_Load';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_I18n_Shared_WAPI_Load
 */
class Request {
    /** @type {String} */
    lang;
    /** @type {String} */
    namespace;
}

/**
 * This response contains unstructured data.
 * @memberOf TeqFw_I18n_Shared_WAPI_Load
 */
class Response {}

/**
 * @implements TeqFw_Web_Api_Shared_Api_IEndpoint
 */
export default class TeqFw_I18n_Shared_WAPI_Load {
    constructor(spec) {
        // DEPS
        /** @type {TeqFw_I18n_Shared_Defaults} */
        const DEF = spec['TeqFw_I18n_Shared_Defaults$'];

        // INSTANCE METHODS

        /**
         * @param {Request|null} data
         * @return {TeqFw_I18n_Shared_WAPI_Load.Request}
         */
        this.createReq = function (data = null) {
            const res = new Request();
            res.lang = data?.lang;
            res.namespace = data?.namespace;
            return res;
        }

        /**
         * This response contains unstructured data.
         * @param {Response|null} data
         * @return {TeqFw_I18n_Shared_WAPI_Load.Response}
         */
        this.createRes = function (data = null) {
            return Object.assign(new Response(), data);
        }

        this.getRoute = () => `/${DEF.NAME}${DEF.WAPI_LOAD}`;
    }
}

// MODULE'S EXPORT
Object.defineProperty(Request, 'namespace', {value: NS});
Object.defineProperty(Response, 'namespace', {value: NS});
