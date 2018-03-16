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
        <br>
        <div v-if="mode !== 'create'">
            <div v-if="role.id">
                <h3>
                    Role
                </h3>
                <span>Role Name: </span><span>{{role.role.name}}</span>
                <span>Role Description: </span><span>{{role.role.description}}</span>
                <h3>
                    School
                </h3>
                <span>School Name: </span><span>{{role.school.name}}</span>
                <span>School Description: </span><span>{{role.school.describe}}</span>
            </div>
            <div v-else>
                <h3>
                    Select A Role
                </h3>
                <div v-for="role in roles" @click="selectRole(role)">
                    <span>Role Name: </span><span>{{role.name}}</span>
                    <span>Role Description: </span><span>{{role.description}}</span>
                </div>
                <div>
                    <span>Selected Role: </span>
                    <span>{{selectedRole.name}}</span>
                </div>
                <h3>
                    Select A School
                </h3>
                <div v-for="school in schools" @click="selectSchool(school)">
                    <span>School Name: </span><span>{{school.name}}</span>
                    <span>Role Description: </span><span>{{school.describe}}</span>
                </div>
                <div>
                    <span>Selected School: </span>
                    <span>{{selectedSchool.name}}</span>
                </div>
                <button @click="assignRole">Assign this role to user</button>
            </div>
        </div>
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
                            this.getUserRole()
                        })
            }
        },
        data() {
            return {
                mode: 'view',
                schools: [],
                selectedSchool: {},
                selectedRole: {},
                roles: [],
                role: {},
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
            },
            getUserRole() {
                this.$http.get('https://wendo-stage.herokuapp.com/user_role/' + this.$route.params.userId)
                    .then(
                        response => {
                            this.role = response.data
                            if (this.role.id === null) {
                                this.getRoles()
                                this.getSchools()
                            }
                        })
            },
            getRoles() {
                this.$http.get('https://wendo-stage.herokuapp.com/role/')
                    .then(
                        response => {
                            this.roles = response.data
                        })
            },
            selectRole(role) {
                this.selectedRole = role
            },
            getSchools() {
                this.$http.get('https://wendo-stage.herokuapp.com/school').then(
                    response => {
                        this.schools = response.data
                    })
            },
            selectSchool(school) {
                this.selectedSchool = school
            },
            assignRole() {
                console.log('aa ', this.selectedRole.name, this.selectedSchool.id)
                const pl = {
                    user_id: this.user.id,
                    role_id: this.selectedRole.id,
                    school_id: this.selectedSchool.id
                }
                this.$http.post('https://wendo-stage.herokuapp.com/user_role/', pl, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        console.log(response)
                    }
                )
            }
        }
    }
</script>
<style>

</style>