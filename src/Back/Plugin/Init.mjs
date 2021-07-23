/**
 * Plugin initialization function.
 *
 * @namespace TeqFw_I18n_Back_Plugin_Init
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_Plugin_Init';

export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Shared_Logger} */
    const logger = spec['TeqFw_Core_Shared_Logger$'];
    /** @type {TeqFw_I18n_Back_Model_Registry} */
    const registry = spec['TeqFw_I18n_Back_Model_Registry$'];

    // DEFINE INNER FUNCTIONS
    async function action() {
        await registry.init();
    }

    // MAIN FUNCTIONALITY
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
