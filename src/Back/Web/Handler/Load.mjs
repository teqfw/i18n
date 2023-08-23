/**
 * Web server handler to load i18n resources on the front.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';

// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_Web_Handler_Load';
const {
    HTTP2_HEADER_CONTENT_TYPE,
    HTTP2_METHOD_POST,
    HTTP_STATUS_OK,
} = H2;


// MODULE'S CLASSES
// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class TeqFw_I18n_Back_Web_Handler_Load {
    /**
     * @param {TeqFw_I18n_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_I18n_Back_Model_Registry} registry
     * @param {TeqFw_I18n_Shared_Dto_Load} dtoLoad
     */
    constructor(
        {
            TeqFw_I18n_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_I18n_Back_Model_Registry$: registry,
            TeqFw_I18n_Shared_Dto_Load$: dtoLoad,
        }) {
        // MAIN
        logger.setNamespace(this.constructor.name);
        Object.defineProperty(process, 'namespace', {value: NS});

        // FUNCS
        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest}req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf TeqFw_I18n_Back_Web_Handler_Load
         */
        async function process(req, res) {
            // FUNCS

            // MAIN
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                try {
                    const json = shares[DEF.MOD_WEB.SHARE_REQ_BODY_JSON];
                    const data = dtoLoad.createDto(json);
                    const lang = data.lang;
                    const ns = data.namespace;
                    const bundle = await registry.getFront(lang, ns);
                    // finalize HTTP request, respond as succeed
                    res.setHeader(HTTP2_HEADER_CONTENT_TYPE, 'application/json');
                    shares[DEF.MOD_WEB.SHARE_RES_BODY] = JSON.stringify(bundle ?? {});
                    shares[DEF.MOD_WEB.SHARE_RES_STATUS] = HTTP_STATUS_OK;
                } catch (e) {
                    logger.error(e);
                }
            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () {
            logger.info(`Web requests handler to load i18n resources is initialized.`);
        }

        this.canProcess = function ({method, address} = {}) {
            return (
                (method === HTTP2_METHOD_POST)
                && (address?.space === DEF.SHARED.SPACE_LOAD)
            );
        }
    }
}
