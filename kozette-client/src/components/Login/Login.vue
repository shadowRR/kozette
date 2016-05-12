<template>

    <div id="login-box">
        <img id="login-logo" src="/static/img/logo/kozette_large_transparent.png" alt="logo kozette">
        <form v-on:submit.prevent="login">
            <p class="red-link">You have to create a new account, and you need an email now !</p>
            <div class="inputs">
                <input type="text" id="email" name="email" placeholder="Email" v-model="email"/>
                <br/>
                <input type="password" id="password" name="password" placeholder="Password" v-model="password"/>
            </div>
            <button type="submit" class="blue-link" v-on:click.prevent="login">[ Login ]</button>
            <button type="button" class="green-link" v-on:click="register">[ Register ]</button>
        </form>
    </div>

</template>

<script type="text/babel">

    // services
    import {feathers_socket, userService} from '../../services';
    // vuex
    import {loginCurrentUser} from '../../vuex/currentUser_actions';
    import {currentUser} from '../../vuex/currentUser_getters';

    export default {
        data() {
            return {
                email: '',
                password: ''
            };
        },
        vuex: {
            getters: { currentUser },
            actions: { loginCurrentUser }
        },
        methods: {
            /**
             * @summary login in
             */
            login() {
                // authenticate
                feathers_socket.authenticate( { type: 'token', email: this.email, password: this.password } )
                        .then( ( result ) => {
                            this.loginCurrentUser( result );
                            this.$router.go( { name: 'app' } );
                        } )
                        .catch( err => console.error( err ) );
            },
            /**
             * @summary register a new user
             */
            register() {
                // create new user
                userService.create( { email: this.email, password: this.password } )
                        .then( user => {
                            this.email = '';
                            this.password = '';
                            alert( 'user created - you can now log in' );
                        } )
                        .catch( err => console.error( err ) );
            }
        }
    }
</script>