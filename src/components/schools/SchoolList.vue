<template>
    <div>
        <h3>
            School List
        </h3>
        <router-link to="/school/new" activeClass="active">
            <button>Add School</button>
        </router-link>
        <div v-for="school in schools" @click="navToSchool(school.id)">{{ school.name }} {{ school.describe }} {{ school.id}}</div>
    </div>
</template>
<script>
    export default {
        name: 'SchoolList',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                schools: []
            }
        },
        created() {
            this.$http.get('https://wendo-stage.herokuapp.com/school').then(
                response => {
                    this.schools = response.data
                })
        },
        methods: {
            navToSchool(id) {
                this.$router.push({ path: '/school/' + id})
            }
        }
    }
</script>
<style>

</style>