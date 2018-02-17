<template>
    <div>
        <h3>
            Student List
        </h3>
        <router-link to="/student/new" activeClass="active">
            <button>Add Student</button>
        </router-link>
        <div v-for="student in students">{{ student.id }} {{ student.user_id }}</div>
    </div>
</template>
<script>
    export default {
        name: 'StudentList',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                students: []
            }
        },
        created() {
            this.$http.get('https://wendo-stage.herokuapp.com/student').then(
                response => {
                    this.students = response.data
                })
        },
        computed: {},
        methods: {
//            getStudents() {
//                this.$http.get('https://wendo-stage.herokuapp.com/student').then(response => {
//                    console.log('get students: ', response)
//                })
//            }
        }
    }
</script>
<style>

</style>