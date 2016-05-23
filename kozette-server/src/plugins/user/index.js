'use strict';

const status = require( './users_status' );

module.exports = function () {
    const app = this;

    app.configure( status );
};