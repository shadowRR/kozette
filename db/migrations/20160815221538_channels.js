'use strict';

exports.up = function( knex, Promise ) {

  	return Promise.all( [

		knex.schema.createTable( 'channels', table => {
			table.increments( 'id' ).primary();
			table.string( 'name' ).notNullable();
			table.string( 'topic' );
 		    table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
			table.timestamp( 'updated_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
	    } ),

	    knex.schema.createTable( 'channels_members', table => {
	    	table.integer( 'user_id' ).notNullable().references( 'id' ).inTable( 'users' );
	    	table.integer( 'channel_id' ).notNullable().references( 'id' ).inTable( 'channels' );
	    	table.timestamp( 'created_at' ).notNullable().defaultTo( knex.raw( 'now()' ) );
	    } ),

	    knex( 'channels' ).insert( { name: 'global' } )

  	] );

};

exports.down = function( knex, Promise ) {

	return Promise.all( [

		knex.schema.dropTable( 'channels_members' ),
	  	knex.schema.dropTable( 'channels' )

	] );

};
