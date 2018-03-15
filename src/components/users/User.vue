<template>
    <div>
        <h3>
            User
        </h3>
        <div>
            User First Name: <input v-if="mode !== 'view'" v-model="user.firstname"><span v-else>{{user.firstname}}</span>
        </div>
        <div>
            User Last Name: <input v-if="mode !== 'view'" v-model="user.lastname"><span v-else>{{user.lastname}}</span>
        </div>
        <div>
            User Username: <input v-if="mode !== 'view'" v-model="user.username"><span v-else>{{user.username}}</span>
        </div>
        <div>
            User Password: <input v-if="mode !== 'view'" v-model="user.password" type="password"><span v-else>{{user.password}}</span>
        </div>
        <div>
            User Email: <input v-if="mode !== 'view'" v-model="user.email"><span v-else>{{user.email}}</span>
        </div>
        <div>
            User Phone: <input v-if="mode !== 'view'" v-model="user.phone"><span v-else>{{user.phone}}</span>
        </div>
        <button v-if="mode === 'create'" @click="createUser">Create User</button>
        <button v-if="mode === 'view'" @click="editUser">Edit User</button>
        <button v-if="mode === 'edit'" @click="saveUser">Save User</button>
    </div>
</template>
<script>
    export default {
        created() {
            if (this.$route.params.userId === 'new') {
                this.mode = 'create'
            } else {
                this.$http.get('https://wendo-stage.herokuapp.com/user/' + this.$route.params.userId)
                    .then(
                        response => {
                            this.user = response.data
                        })
            }
        },
        data() {
            return {
                mode: 'view',
                user: {
                    firstname: null,
                    lastname: null,
                    username: null,
                    password: null,
                    email: null,
                    phone: null
                }
            }
        },
        methods: {
            createUser() {
                const usr = {
                    firstname: this.user.firstname,
                    lastname: this.user.lastname,
                    username: this.user.username,
                    password: this.user.password,
                    email: this.user.email,
                    phone: this.user.phone
                }
                this.$http.post('https://wendo-stage.herokuapp.com/user/', usr, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.user = response.data
                        this.mode = 'view'
                    }
                )
            },
            editUser() {
                this.mode = 'edit'
            },
            saveUser() {
                const usr = {
                    firstname: this.user.firstname,
                    lastname: this.user.lastname,
                    username: this.user.username,
                    password: this.user.password,
                    email: this.user.email,
                    phone: this.user.phone
                }
                this.$http.put('https://wendo-stage.herokuapp.com/user/' + this.user.id, usr, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.user = response.data
                        this.mode = 'view'
                    }
                )
            }
        }
    }
</script>
<style>

</style>