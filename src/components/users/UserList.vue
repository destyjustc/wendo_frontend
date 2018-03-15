<template>
    <div>
        <h3>
            User List
        </h3>
        <router-link to="/user/new" activeClass="active">
            <button>Add User</button>
        </router-link>
        <div v-for="user in users" @click="navToUser(user.id)">{{ user.firstname }} {{ user.lastname }} </div>
    </div>
</template>
<script>
    export default {
        name: 'UserList',
        data () {
            return {
                users: []
            }
        },
        created() {
            this.$http.get('https://wendo-stage.herokuapp.com/user/').then(
                response => {
                    this.users = response.data
                })
        },
        computed: {},
        methods: {
            navToUser(id) {
                this.$router.push({path: '/user/' + id})
            }
        }
    }
</script>
<style>

</style>