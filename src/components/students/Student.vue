<template>
    <div>
        <h3>
            Student
        </h3>
        <div>
            Student Id: <input v-if="mode !== 'view'" v-model="student.id"><span v-else>{{student.id}}</span>
        </div>
        <div>
            Student Name: <input v-if="mode !== 'view'" v-model="student.name"><span v-else>{{student.name}}</span>
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
                this.$http.get('https://wendo-stage.herokuapp.com/student/' + this.$route.params.studentId)
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
                    id: null,
                    name: null
                }
            }
        },
        methods: {
            createStudent() {
                const std = {
                    id: this.student.id,
                    name: this.student.name
                }
                this.$http.post('https://wendo-stage.herokuapp.com/student/', std, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        console.log(response)
                    }
                )
            },
            editStudent() {
                this.mode = 'edit'
            },
            saveStudent() {
                this.mode = 'view'
            }
        }
    }
</script>
<style>

</style>