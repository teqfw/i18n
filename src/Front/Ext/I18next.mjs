/**
 * Wrap i18next library to use as ES6 module in TeqFW on the front.
 *
 * @namespace TeqFw_I18n_Front_Ext_I18next
 */
import * as i18next from '../../../../i18n/i18next.bundled.js';
// re-export
const I18n = i18next.default;
export {I18n as default}
export const {
    changeLanguage,
    createInstance,
    exists,
    getFixedT,
    hasLoadedNamespace,
    init,
    loadLanguages,
    loadNamespaces,
    loadResources,
    reloadResources,
    setDefaultNamespace,
    t,
    use
} = i18next;
