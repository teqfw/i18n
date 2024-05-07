/**
 * Plugin initialization function.
 *
 * @namespace TeqFw_I18n_Back_Plugin_Init
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_Plugin_Init';
/**
 * @param {TeqFw_I18n_Back_Model_Registry} registry
 */

export default function Factory(
    {
        TeqFw_I18n_Back_Model_Registry$: registry,
    }) {
    // FUNCS
    async function action() {
        await registry.init();
    }

    // MAIN
    Object.defineProperty(action, 'namespace', {value: NS});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'namespace', {value: NS});
