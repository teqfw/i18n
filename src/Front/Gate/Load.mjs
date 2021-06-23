/**
 * Frontend gate to "Load i18n resources" service.
 * @namespace TeqFw_I18n_Front_Gate_Load
 */
// DEFINE WORKING VARS
const NS = 'TeqFw_I18n_Front_Gate_Load';

/**
 * Factory to create frontend gate.
 * @return function(TeqFw_I18n_Shared_Service_Route_Load.Request): boolean
 * @memberOf TeqFw_I18n_Front_Gate_Load
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_I18n_Defaults} */
    const DEF = spec['TeqFw_I18n_Defaults$'];   // singleton
    /** @type {TeqFw_Http2_Front_Gate_Connect} */
    const backConnect = spec['TeqFw_Http2_Front_Gate_Connect$']; // singleton
    /** @type {typeof TeqFw_I18n_Shared_Service_Route_Load.Response} */
    const Response = spec['TeqFw_I18n_Shared_Service_Route_Load#Response']; // class

    // DEFINE INNER FUNCTIONS
    /**
     * @param {TeqFw_I18n_Shared_Service_Route_Load.Request} data
     * @returns {Promise<TeqFw_I18n_Shared_Service_Route_Load.Response|boolean>}
     * @memberOf TeqFw_I18n_Front_Gate_Load
     */
    async function gate(data) {
        let result = false;
        const res = await backConnect.send(data, DEF.BACK_REALM, DEF.SERV_load);
        if (res) {
            result = Object.assign(new Response(), res);
        }
        return result;
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(gate, 'name', {value: `${NS}.${gate.name}`});

    // COMPOSE RESULT
    return gate;
}

// MODULE'S FUNCTIONALITY
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.constructor.name}`});

// MODULE'S EXPORT
export default Factory;
