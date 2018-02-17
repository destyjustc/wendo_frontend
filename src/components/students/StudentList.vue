<template>
    <div>
        <h3>
            Student List
        </h3>
        <router-link to="/student/new" activeClass="active">
            <button>Add Student</button>
        </router-link>
        <div v-for="student in students">{{ student.id }} {{ student.user_id }}</div>
        <qrcode-vue :value="qrValue" :size="qrSize" level="H"></qrcode-vue>
    </div>
</template>
<script>
    import QrcodeVue from 'qrcode.vue'
    export default {
        name: 'StudentList',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                students: [],
                qrValue: 'https://example.com',
                qrSize: 300
            }
        },
        created() {
            this.$http.get('https://wendo-stage.herokuapp.com/student').then(
                response => {
                    this.students = response.data
                })
        },
        computed: {},
        methods: {},
        components: {
            QrcodeVue
        }
    }
</script>
<style>

</style>