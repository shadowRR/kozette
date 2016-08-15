'use strict';

exports.up = function( knex, Promise ) {

  	return Promise.all( [

		knex.schema.createTable( 'messages', table => {
			table.increments( 'id' ).primary();
			table.integer( 'user_id' ).notNullable().references( 'id' ).inTable( 'users' );
			table.integer( 'channel_id' ).notNullable().references( 'id' ).inTable( 'channels' );
			table.text( 'text' ).notNullable();
			table.enum( 'type', [ 'basic', 'markdown', 'embed' ] ).notNullable().defaultTo( 'basic' );
			table.boolean( 'pinned' ).notNullable().defaultTo( false );
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
