'use strict';

exports.up = function( knex, Promise ) {

  	return Promise.all( [

		knex.schema.createTable( 'messages', table => {
			table.increments( 'id' ).primary();
			table.integer( 'user_id' ).notNullable().references( 'id' ).inTable( 'users' );
			table.enum( 'notifications', [ 'all', 'mentions', 'none' ] ).notNullable().defaultTo( 'all' );
			table.enum( 'sounds', [ 'all', 'mentions', 'none' ] ).notNullable().defaultTo( 'all' );
 		    table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
			table.timestamp( 'updated_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
	    } )

  	] );

};

exports.down = function( knex, Promise ) {

	return Promise.all( [

	  	knex.schema.dropTable( 'messages' )

	] );

};
