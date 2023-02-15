/**
 * Request to load I18n resources from back-end.
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Shared_Dto_Load';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_I18n_Shared_Dto_Load
 */
class Dto {
    static namespace = NS;
    /** @type {string} */
    lang;
    /** @type {string} */
    namespace;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_I18n_Shared_Dto_Load {

    constructor(spec) {
        /** @type {TeqFw_Core_Shared_Util_Cast.castString|function} */
        const castString = spec['TeqFw_Core_Shared_Util_Cast.castString'];

        // INSTANCE METHODS
        /**
         * @param {TeqFw_I18n_Shared_Dto_Load.Dto} data
         * @return {TeqFw_I18n_Shared_Dto_Load.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.lang = castString(data?.lang);
            res.namespace = castString(data?.namespace);
            return res;
        }
    }

}