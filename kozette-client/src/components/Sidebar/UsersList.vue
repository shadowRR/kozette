<template>

    <span class="oneliner">// Users -----------------------------------------------------------</span>
    <div v-for="user in users | orderBy 'status.online' -1">
        <span v-if="user.status.online" class="green-text bold">+</span>
        <span v-else class="red-text bold">-</span>
        <span v-bind:style="{color: user.color}">
            <span v-bind:class="{'line-through': user.status.muted}">{{user.nickname || user.email}}</span>
            <span v-if="user.status.message">({{user.status.message}})</span>
        </span>
    </div>

</template>

<script type="text/babel">

    // vuex
    import { getUsersList} from '../../vuex/users_getters.js';
    import { fetchUsers, addUser, updateAndPatchUser } from '../../vuex/users_actions.js';

    export default {

        vuex: {

            getters: {
                users: getUsersList
            },

            actions: {
                fetchUsers,
                addUser,
                updateAndPatchUser
            }

        },

        created() {
            // trigger watch on each dispatch available
            // for the users list
            this.fetchUsers();
            this.addUser();
            this.updateAndPatchUser();
        }
        
    }

</script>