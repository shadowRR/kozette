'use strict';

exports.up = function( knex, Promise ) {

  	return Promise.all( [

		knex.schema.createTable( 'users', table => {
			table.increments( 'id' ).primary();
			table.string( 'email' ).notNullable().unique();
			table.string( 'username' );
			table.string( 'password' ).notNullable();
			table.specificType( 'roles', 'varchar(255)[]' ).notNullable().defaultTo( knex.raw( 'ARRAY[]::varchar(255)[]' ) );
 		    table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
			table.timestamp( 'updated_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
	    } )

  	] );

};

exports.down = function( knex, Promise ) {

	return Promise.all( [

	  	knex.schema.dropTable( 'users' )

	] );

};
