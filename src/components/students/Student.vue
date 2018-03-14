<template>
    <div>
        <h3>
            Student
        </h3>
        <div>
            Student First Name: <input v-if="mode !== 'view'" v-model="student.firstname"><span v-else>{{student.firstname}}</span>
        </div>
        <div>
            Student Last Name: <input v-if="mode !== 'view'" v-model="student.lastname"><span v-else>{{student.lastname}}</span>
        </div>
        <div>
            Student Username: <input v-if="mode !== 'view'" v-model="student.username"><span v-else>{{student.username}}</span>
        </div>
        <div>
            Student Password: <input v-if="mode !== 'view'" v-model="student.password" type="password"><span v-else>{{student.password}}</span>
        </div>
        <div>
            Student Email: <input v-if="mode !== 'view'" v-model="student.email"><span v-else>{{student.email}}</span>
        </div>
        <div>
            Student Phone: <input v-if="mode !== 'view'" v-model="student.phone"><span v-else>{{student.phone}}</span>
        </div>
        <button v-if="mode === 'create'" @click="createStudent">Create Student</button>
        <button v-if="mode === 'view'" @click="editStudent">Edit Student</button>
        <button v-if="mode === 'edit'" @click="saveStudent">Save Student</button>
    </div>
</template>
<script>
    export default {
        created() {
            if (this.$route.params.studentId === 'new') {
                this.mode = 'create'
            } else {
                this.$http.get('https://wendo-stage.herokuapp.com/student/school/' + this.$route.params.schoolId + '/' + this.$route.params.studentId)
                    .then(
                        response => {
                            this.student = response.data
                        })
            }
        },
        data() {
            return {
                mode: 'view',
                student: {
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
            createStudent() {
                const std = {
                    firstname: this.student.firstname,
                    lastname: this.student.lastname,
                    username: this.student.username,
                    password: this.student.password,
                    email: this.student.email,
                    phone: this.student.phone
                }
                this.$http.post('https://wendo-stage.herokuapp.com/student/school/' + this.$route.params.schoolId, std, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.student = response.data
                        this.mode = 'view'
                    }
                )
            },
            editStudent() {
                this.mode = 'edit'
            },
            saveStudent() {
                const std = {
                    firstname: this.student.firstname,
                    lastname: this.student.lastname,
                    username: this.student.username,
                    password: this.student.password,
                    email: this.student.email,
                    phone: this.student.phone
                }
                this.$http.put('https://wendo-stage.herokuapp.com/student/school/' + this.$route.params.schoolId + '/' + this.student.id, std, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.student = response.data
                        this.mode = 'view'
                    }
                )
            }
        }
    }
</script>
<style>

</style>