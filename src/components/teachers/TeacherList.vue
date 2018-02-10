<template>
    <div>
        <h3>
            Teacher List
        </h3>
        <router-link to="/teacher/new" activeClass="active">
            <button>Add Teacher</button>
        </router-link>
        <div v-for="teacher in teachers">{{ teacher.id }} {{ teacher.name }}</div>
    </div>
</template>
<script>
    export default {
        name: 'TeacherList',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                teachers: [
                    {id: 1, name: 'kevin'},
                    {id: 2, name: 'josh'}
                ]
            }
        },
        created() {
            console.log('need API for teacher list')
        }
    }
</script>
<style>

</style>