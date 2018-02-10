<template>
    <div>
        <h3>
            Class List
        </h3>
        <router-link to="/class/new" activeClass="active">
            <button>Add Class</button>
        </router-link>
        <div v-for="cls in classes">{{ cls.id }} {{ cls.name }}</div>
    </div>
</template>
<script>
    export default {
        name: 'ClassList',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                classes: [
                    {id: 1, name: 'Math101'},
                    {id: 2, name: 'Math102'}
                ]
            }
        },
        created() {
            console.log('need API for class list')
        }
    }
</script>
<style>

</style>