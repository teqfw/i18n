import {constants as H2} from 'http2';

/**
 * Load i18n resources.
 *
 * @namespace TeqFw_I18n_Back_Service_Load
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_Service_Load';

/**
 * Service to remove weight stats data for the user.
 * @implements TeqFw_Http2_Back_Api_Service_Factory
 */
class TeqFw_I18n_Back_Service_Load {

    constructor(spec) {
        // EXTRACT DEPS
        /** @type {TeqFw_I18n_Defaults} */
        const DEF = spec['TeqFw_I18n_Defaults$'];
        /** @type {TeqFw_I18n_Back_Model_Registry} */
        const registry = spec['TeqFw_I18n_Back_Model_Registry$']; // singleton
        /** @type {typeof TeqFw_Http2_Plugin_Handler_Service.Result} */
        const ApiResult = spec['TeqFw_Http2_Plugin_Handler_Service#Result']; // class
        /** @type {typeof TeqFw_I18n_Shared_Service_Route_Load.Request} */
        const Request = spec['TeqFw_I18n_Shared_Service_Route_Load#Request']; // class
        /** @type {typeof TeqFw_I18n_Shared_Service_Route_Load.Response} */
        const Response = spec['TeqFw_I18n_Shared_Service_Route_Load#Response']; // class

        // DEFINE THIS INSTANCE METHODS

        this.getRoute = () => DEF.SERV_load;

        /**
         * Factory to create function to validate and structure incoming data.
         * @returns {function(TeqFw_Http2_Back_Server_Stream_Context): TeqFw_I18n_Shared_Service_Route_Load.Request}
         */
        this.createInputParser = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Back_Server_Stream_Context} context
             * @returns {TeqFw_I18n_Shared_Service_Route_Load.Request}
             * @memberOf TeqFw_I18n_Back_Service_Load
             */
            function parse(context) {
                const body = JSON.parse(context.body);
                // clone HTTP body into API request object
                return Object.assign(new Request(), body.data);
            }

            // COMPOSE RESULT
            Object.defineProperty(parse, 'name', {value: `${NS}.${parse.name}`});
            return parse;
        };

        /**
         * Factory to create service (handler to process HTTP API request).
         * @returns {function(TeqFw_Http2_Plugin_Handler_Service.Context): TeqFw_Http2_Plugin_Handler_Service.Result}
         */
        this.createService = function () {
            // DEFINE INNER FUNCTIONS
            /**
             * @param {TeqFw_Http2_Plugin_Handler_Service.Context} apiCtx
             * @returns {Promise<TeqFw_Http2_Plugin_Handler_Service.Result>}
             * @memberOf TeqFw_I18n_Back_Service_Load
             */
            async function service(apiCtx) {
                // MAIN FUNCTIONALITY
                const result = new ApiResult();
                const response = new Response();
                result.response = response;
                /** @type {TeqFw_I18n_Shared_Service_Route_Load.Request} */
                const apiReq = apiCtx.request;
                const shared = apiCtx.sharedContext;

                const lang = apiReq.lang;
                const ns = apiReq.namespace;
                const bundle = await registry.getBundle(lang, ns);
                result.response = Object.assign(response, bundle);
                return result;
            }

            // COMPOSE RESULT
            Object.defineProperty(service, 'name', {value: `${NS}.${service.name}`});
            return service;
        };


    }
}

export default TeqFw_I18n_Back_Service_Load;
