<template>
    <div>
        <h3>
            Select A School
        </h3>
        <div v-for="school in schools" @click="selectSchool(school)">{{ school.name }} {{ school.describe }} {{ school.id}}</div>
        <div>selected school: {{ selectedSchool.name }}</div>
        <h3>
            Student List
        </h3>
        <router-link :to="{path: '/student/school/' + selectedSchool.id + '/new'}" activeClass="active">
            <button>Add Student</button>
        </router-link>
        <div v-for="student in students" @click="navToStudent(student.id)">{{ student.firstname }} {{ student.lastname }}</div>
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
                selectedSchool: {name: null, id: null, describe: null},
                students: [],
                schools: [],
                qrValue: 'https://example.com',
                qrSize: 300
            }
        },
        created() {
            this.$http.get('https://wendo-stage.herokuapp.com/school').then(
                response => {
                    this.schools = response.data
                })
        },
        computed: {},
        methods: {
            selectSchool(sch) {
                this.selectedSchool = sch
                this.$http.get('https://wendo-stage.herokuapp.com/student/school/' + this.selectedSchool.id).then(
                    response => {
                        this.students = response.data
                    })
            },
            navToStudent(id) {
                this.$router.push({path: '/student/school/' + this.selectedSchool.id + '/' + id})
            }
        },
        components: {
            QrcodeVue
        }
    }
</script>
<style>

</style>