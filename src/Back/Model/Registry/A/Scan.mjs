/**
 * Factory to create function to scan teqfw-plugins for i18n resources.
 *
 * @namespace TeqFw_I18n_Back_Model_Registry_A_Scan
 */
// MODULE'S IMPORT
import $fs from 'fs';
import $path from 'path';

// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_Model_Registry_A_Scan';
const I18N_DIR = 'i18n'; // root folder in plugin to store i18n resources (front.lang.json)
/** @type {RegExp} expression for filename with i18n resources (namespace.ln.json)  */
const FILE_MASK = /^([A-Za-z0-9_]*).([a-z]{2})(.json)$/;

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the action.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @return function(): Object
 * @memberOf TeqFw_I18n_Back_Model_Registry_A_Scan
 */
function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_Core_Back_Config} */
    const config = spec['TeqFw_Core_Back_Config$'];
    /** @type {TeqFw_Core_Back_Scan_Plugin_Registry} */
    const registry = spec['TeqFw_Core_Back_Scan_Plugin_Registry$'];
    /** @type {Function|TeqFw_Core_Shared_Util.deepMerge} */
    const deepMerge = spec['TeqFw_Core_Shared_Util#deepMerge'];

    // DEFINE INNER FUNCTIONS
    /**
     * Scan teqfw-plugins for i18n resources.
     *
     * @returns {Promise<{}>}
     * @memberOf TeqFw_I18n_Back_Model_Registry_A_Scan
     */
    async function action() {
        const result = {};
        const rootFs = config.get()?.path?.root; // path to project root
        for (const item of registry.items()) {
            const rootI18n = $path.join(rootFs, I18N_DIR); // path to resources root
            if ($fs.existsSync(rootI18n) && $fs.statSync(rootI18n).isDirectory()) {
                const files = $fs.readdirSync(rootI18n);
                for (const file of files) {
                    if (file.match(FILE_MASK)) {
                        const parts = FILE_MASK.exec(file);
                        const ns = parts[1];
                        const lang = parts[2];
                        const path = $path.join(rootI18n, file);
                        if ($fs.statSync(path).isFile()) {
                            const json = $fs.readFileSync(path);
                            const data = JSON.parse(json.toString());
                            const dict = {[lang]: {[ns]: data}};
                            deepMerge(result, dict);
                        }
                    }
                }
            }
        }
        return result;
    }

    // COMPOSE RESULT
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// MODULE'S EXPORT
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
export {
    Factory as default
};
