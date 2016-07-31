'use strict';

const user = require( './user' );

module.exports = function () {
    const app = this;

    app.configure( user );
};