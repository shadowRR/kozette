'use strict';

const status = require( './cron/users_status' );

module.exports = function () {
    const app = this;

    app.configure( status );
};