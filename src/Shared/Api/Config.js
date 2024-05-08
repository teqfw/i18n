/**
 * The i18n configuration object should be implemented in your project plugin
 * (see `TeqFw_Core_Shared_App_Di_PreProcessor_Replace`).
 *
 * @interface
 */
export default class TeqFw_I18n_Shared_Api_Config {
    /**
     * Get the default language ('es' or 'es_ES').
     * @return {string}
     */
    getLangDefault() {}

    /**
     * Get the list of available languages (['es', 'es_ES']).
     * @return {string[]}
     */
    getLangs() {}
}
