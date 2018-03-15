<template>
    <div>
        <h3>
            Select A School
        </h3>
        <div v-for="school in schools" @click="selectSchool(school)">{{ school.name }} {{ school.describe }} {{ school.id}}</div>
        <div>selected school: {{ selectedSchool.name }}</div>
        <h3>
            Course List
        </h3>
        <router-link :to="{path: '/course/school/' + selectedSchool.id + '/new'}" activeClass="active">
            <button>Add Course</button>
        </router-link>
        <div v-for="course in courses" @click="navToCourse(course.id)">{{ course.name }} {{ course.description }} {{ course.fee }}</div>
    </div>
</template>
<script>
    export default {
        name: 'CourseList',
        data () {
            return {
                selectedSchool: {name: null, id: null, describe: null},
                courses: [],
                schools: []
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
                this.$http.get('https://wendo-stage.herokuapp.com/course/school/' + this.selectedSchool.id).then(
                    response => {
                        this.courses = response.data
                    })
            },
            navToCourse(id) {
                this.$router.push({path: '/course/school/' + this.selectedSchool.id + '/' + id})
            }
        }
    }
</script>
<style>

</style>