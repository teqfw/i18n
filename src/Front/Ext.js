/**
 * Wrap i18next libraries to use in TeqFW on the front.
 *
 * @namespace TeqFw_I18n_Front_Ext
 */
// MODULE'S IMPORTS
import {loadUmd} from '../../../web/@teqfw/web/js/loaders.mjs';

// MODULE'S MAIN
if (!window.i18next) await loadUmd('../../../../src/i18n/i18next.min.js');
if (!window.i18nextBrowserLanguageDetector) await loadUmd('../../../../src/i18n-bld/i18nextBrowserLanguageDetector.js');
const i18next = window.i18next;
const i18bld = window.i18nextBrowserLanguageDetector;
i18next.use(i18bld);
export {i18next} ;
