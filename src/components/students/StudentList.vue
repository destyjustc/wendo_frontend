<template>
    <div>
        Student List
        <button @click="getStudents">Students</button>
    </div>
</template>
<script>
    export default {
        name: 'StudentList',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App'
            }
        },
        computed: {

        },
        methods: {
            getStudents() {
                this.$http.get('https://wendo-stage.herokuapp.com/student/').then(response => {
                    console.log('get students: ', response)
                })
            }
        }
    }
</script>
<style>

</style>