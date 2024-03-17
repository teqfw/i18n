/**
 * Wrap i18next libraries to use in TeqFW on the front.
 *
 * @namespace TeqFw_I18n_Front_Ext
 */

// MODULE'S FUNCS
/**
 * Load UMD script from the back and execute it.
 * @param {string} url
 * @return {Promise}
 */
async function loadUmd(url) {
    return new Promise((resolve, reject) => {
        // Create a script element
        const script = document.createElement('script');
        script.src = url;
        script.onload = () => resolve();
        script.onerror = (error) => reject(error);
        document.head.appendChild(script);
    });
}

// MODULE'S MAIN
if (!window.i18next) await loadUmd('../../../../src/i18n/i18next.min.js');
if (!window.i18nextBrowserLanguageDetector) await loadUmd('../../../../src/i18n-bld/i18nextBrowserLanguageDetector.js');
const i18next = window.i18next;
const i18bld = window.i18nextBrowserLanguageDetector;
i18next.use(i18bld);
export {i18next} ;
