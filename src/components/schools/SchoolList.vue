<template>
    <div>
        <h3>
            School List
        </h3>
        <router-link to="/school/new" activeClass="active">
            <button>Add School</button>
        </router-link>
        <div v-for="school in schools">{{ school.id }} {{ school.name }}</div>
    </div>
</template>
<script>
    export default {
        name: 'SchoolList',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                schools: [
                    {id: 1, name: 'blue shit'},
                    {id: 2, name: 'new oriental'}
                ]
            }
        },
        created() {
            console.log('need API for school list')
        }
    }
</script>
<style>

</style>