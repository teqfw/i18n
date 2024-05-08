/**
 * The translation item contains a text translations for a some set of languages:
 * {es: 'Hola', en: 'Hello', de: 'Hallo'}
 */
// MODULE'S VARS
const NS = 'TeqFw_I18n_Shared_Dto_Item';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_I18n_Shared_Dto_Item
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
export default class TeqFw_I18n_Shared_Dto_Item {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_I18n_Shared_Dto_Item.Dto} data
         * @return {TeqFw_I18n_Shared_Dto_Item.Dto}
         */
        this.createDto = function (data = null) {
            const res = new Dto();
            res.lang = cast.string(data?.lang);
            res.namespace = cast.string(data?.namespace);
            return res;
        };
    }

}