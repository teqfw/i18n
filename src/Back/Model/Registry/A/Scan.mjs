/**
 * Scanner to load i18n resources for teq-plugins.
 *
 * @namespace TeqFw_I18n_Back_Model_Registry_A_Scan
 */
// MODULE'S IMPORT
import {existsSync, readdirSync, readFileSync, statSync} from 'fs';
import {join} from 'path';

// MODULE'S VARS
const NS = 'TeqFw_I18n_Back_Model_Registry_A_Scan';
const FILE_MASK = /^([A-Za-z-]*)(.json)$/; // 'es-us.json'

// MODULE'S FUNCTIONS
/**
 * Factory to setup execution context and to create the action.
 *
 * @param {TeqFw_Di_Shared_SpecProxy} spec
 * @return function(): Object
 * @memberOf TeqFw_I18n_Back_Model_Registry_A_Scan
 */
export default function Factory(spec) {
    // EXTRACT DEPS
    /** @type {TeqFw_I18n_Back_Defaults} */
    const DEF = spec['TeqFw_I18n_Back_Defaults$'];
    /** @type {TeqFw_Core_Back_App_Init_Plugin_Registry} */
    const registry = spec['TeqFw_Core_Back_App_Init_Plugin_Registry$'];
    /** @type {Function|TeqFw_Core_Shared_Util.deepMerge} */
    const deepMerge = spec['TeqFw_Core_Shared_Util#deepMerge'];

    // DEFINE INNER FUNCTIONS
    /**
     * Scan teq-plugins for i18n resources.
     *
     * @return {Promise<{back: {}, front: {}}>}
     * @memberOf TeqFw_I18n_Back_Model_Registry_A_Scan
     */
    async function action() {
        // DEFINE INNER FUNCTIONS
        /**
         * Read all langs resources from one folder (shared, back, front).
         * @param {string} path full path to the folder with language resources
         * @param {string} ns namespace for loaded resources
         * @return {{}}
         */
        function readLangs(path, ns) {
            const res = {};
            if (existsSync(path) && statSync(path).isDirectory()) {
                const files = readdirSync(path);
                for (const file of files) {
                    const fullPath = join(path, file);
                    if (statSync(fullPath).isFile()) {
                        const parts = FILE_MASK.exec(file);
                        if (Array.isArray(parts)) {
                            const json = readFileSync(fullPath);
                            const data = JSON.parse(json.toString());

                            const lang = parts[1];
                            const dict = {[lang]: {[ns]: data}};
                            Object.assign(res, dict);
                        }
                    }
                }
            }
            return res;
        }

        // MAIN FUNCTIONALITY
        const back = {}, front = {};
        for (const item of registry.getItemsByLevels()) {
            const ns = item.name;
            const dirI18n = join(item.path, DEF.DIR_I18N); // path to root of i18n resources
            if (existsSync(dirI18n) && statSync(dirI18n).isDirectory()) {
                // read all languages resources by area
                const dirShared = join(dirI18n, DEF.DIR_SHARED);
                const dirBack = join(dirI18n, DEF.DIR_BACK);
                const dirFront = join(dirI18n, DEF.DIR_FRONT);
                const shared = readLangs(dirShared, ns);
                const backOnly = readLangs(dirBack, ns);
                const frontOnly = readLangs(dirFront, ns);
                // merge plugin's shared and back/front resources with overwrite
                const backPlugin = deepMerge({}, shared);
                deepMerge(backPlugin, backOnly);
                const frontPlugin = deepMerge(shared, frontOnly);
                // merge plugin's resources and app global resources
                deepMerge(back, backPlugin);
                deepMerge(front, frontPlugin);
            }
        }
        return {back, front};
    }

    // COMPOSE RESULT
    Object.defineProperty(action, 'name', {value: `${NS}.${action.name}`});
    return action;
}

// finalize code components for this es6-module
Object.defineProperty(Factory, 'name', {value: `${NS}.${Factory.name}`});
