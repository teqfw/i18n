/**
 * Request and response for "Load i18n resources" service.
 *
 * @namespace TeqFw_I18n_Shared_Service_Route_Load
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Shared_Service_Route_Load';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_I18n_Shared_Service_Route_Load
 */
class Request {
    /** @type {String} */
    lang;
    /** @type {String} */
    namespace;
}

/**
 * @memberOf TeqFw_I18n_Shared_Service_Route_Load
 */
class Response {
}

// MODULE'S EXPORT
Object.defineProperty(Request, 'name', {value: `${NS}.${Request.name}`});
Object.defineProperty(Response, 'name', {value: `${NS}.${Response.name}`});
export {
    Request,
    Response,
};
