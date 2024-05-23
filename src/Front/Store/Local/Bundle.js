/**
 * The store for the i18n resources for various locales.
 */
export default class TeqFw_I18n_Front_Store_Local_Bundle {
    /**
     * @param {TeqFw_I18n_Front_Defaults} DEF
     */
    constructor(
        {
            TeqFw_I18n_Front_Defaults$: DEF,
        }
    ) {
        // VARS
        const KEY = `${DEF.SHARED.NAME}/bundle`;

        // INSTANCE METHODS

        /**
         * Clear all stored bundles.
         */
        this.clear = function () {
            const bundles = [];
            const total = self.window.localStorage.length;
            for (let i = 0; i < total; i++) {
                const key = self.window.localStorage.key(i);
                if (key.startsWith(KEY)) bundles.push(key);
            }
            bundles.forEach((key) => self.window.localStorage.removeItem(key));
        };

        /**
         * Get the stored bundle for the requested locale.
         * @param {string} locale
         * @return {string}
         */
        this.get = function (locale) {
            return self.window.localStorage.getItem(KEY + '/' + locale);
        };

        /**
         * Store the given bundle for the requested locale.
         * @param {string} data
         * @param {string} locale
         */
        this.set = function (data, locale) {
            self.window.localStorage.setItem(KEY + '/' + locale, String(data));
        };

    }
}
