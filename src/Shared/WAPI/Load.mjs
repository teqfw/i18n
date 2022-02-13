/**
 * Route data for service to load i18n resources on the front.
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
 * Factory to create new DTOs and get route address.
 * @memberOf TeqFw_I18n_Shared_WAPI_Load
 * @implements TeqFw_Web_Shared_Api_WAPI_IRoute
 */
class Factory {
    static namespace = NS;
    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_I18n_Shared_Defaults} */
        const DEF = spec['TeqFw_I18n_Shared_Defaults$'];

        // DEFINE INSTANCE METHODS
        this.getRoute = () => `/${DEF.NAME}${DEF.SRV_LOAD}`;

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

    }
}

// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.constructor.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.constructor.name}`});
export {
    Factory,
    Request,
    Response,
};
