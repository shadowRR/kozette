'use strict';

module.exports = {

    development: {
        client: 'postgresql',
        connection: 'postgres://postgres:@192.168.99.100:5432/kozette',
        migrations: {
            tableName: 'migrations',
            directory: './migrations'
        },
        seeds: {
            directory: './seeds/dev'
        }
    },

    test: {
        client: 'postgresql',
        connection: 'postgres://postgres:@192.168.99.100:5433/kozette-test',
        migrations: {
            tableName: 'migrations',
            directory: './migrations'
        },
        seeds: {
            directory: './seeds/dev'
        }
    },

    gitlab: {
        client: 'postgresql',
        connection: 'postgres://postgres:@postgres/kozette-test',
        migrations: {
            tableName: 'migrations',
            directory: './migrations'
        },
        seeds: {
            directory: './seeds/dev'
        }
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user:     'username',
            password: 'password'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'migrations'
        }
    }

};
