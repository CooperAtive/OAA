/**
 *  * New Relic agent configuration.
 *   *
 *    * See lib/config.defaults.js in the agent distribution for a more complete
 *     * description of configuration variables and their potential values.
 *      */
exports.config = {
    /**
     *    * Array of application names.
     *       */
    app_name : ['Our Agenda App'],
    /**
     *    * Your New Relic license key.
     *       */
    license_key : process.env.NEWRELIC_LICENSE_KEY,
    logging : {
        level : 'trace'
    }
};
