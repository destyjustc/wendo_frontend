<template>
    <div>
        <h3>
            Course
        </h3>
        <div>
            Course Name: <input v-if="mode !== 'view'" v-model="course.name"><span v-else>{{course.name}}</span>
        </div>
        <div>
            Course Description: <input v-if="mode !== 'view'" v-model="course.description"><span v-else>{{course.description}}</span>
        </div>
        <div>
            Course Fee: <input v-if="mode !== 'view'" v-model="course.fee"><span v-else>{{course.fee}}</span>
        </div>
        <button v-if="mode === 'create'" @click="createCourse">Create Course</button>
        <button v-if="mode === 'view'" @click="editCourse">Edit Course</button>
        <button v-if="mode === 'edit'" @click="saveCourse">Save Course</button>
        <button v-if="mode === 'view'" @click="deleteCourse">Delete Course</button>
    </div>
</template>
<script>
    export default {
        created() {
            if (this.$route.params.courseId === 'new') {
                this.mode = 'create'
            } else {
                this.$http.get('https://wendo-stage.herokuapp.com/course/school/' + this.$route.params.schoolId + '/' + this.$route.params.courseId)
                    .then(
                        response => {
                            this.course = response.data
                        })
            }
        },
        data() {
            return {
                mode: 'view',
                course: {
                    name: null,
                    description: null,
                    fee: null,
                    school_id: null
                }
            }
        },
        methods: {
            createCourse() {
                const std = {
                    name: this.course.name,
                    description: this.course.description,
                    fee: this.course.fee,
                    school_id: this.course.school_id
                }
                this.$http.post('https://wendo-stage.herokuapp.com/course/school/' + this.$route.params.schoolId, std, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.course = response.data
                        this.mode = 'view'
                    }
                )
            },
            editCourse() {
                this.mode = 'edit'
            },
            saveCourse() {
                const std = {
                    name: this.course.name,
                    description: this.course.description,
                    fee: this.course.fee,
                    school_id: this.course.school_id
                }
                this.$http.put('https://wendo-stage.herokuapp.com/course/school/' + this.$route.params.schoolId + '/' + this.course.id, std, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.course = response.data
                        this.mode = 'view'
                    }
                )
            },
            deleteCourse() {
                this.$http.delete('https://wendo-stage.herokuapp.com/course/school/' + this.$route.params.schoolId + '/' + this.course.id, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.$router.push({path: '/courselist'})
                    }
                )
            }
        }
    }
</script>
<style>

</style>