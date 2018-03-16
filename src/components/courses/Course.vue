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
        <div v-if="mode !== 'create'">
            <h3>All Students:</h3>
            <div v-for="student in students" @click="selectStudent(student)">
                <span>Student First Name: </span><span>{{student.firstname}}</span>
                <span>Student Last Name: </span><span>{{student.lastname}}</span>
            </div>
            <div>
                <span>Selected Student</span>
                <span>{{selectedStudent.firstname}}</span>
                <span>{{selectedStudent.lastname}}</span>
            </div>
            <button @click="registerStudent">Register Selected Student to This Course</button>
            <h3>Registered Students:</h3>
            <div v-for="student in registeredStudents" @click="selectStudent(student)">
                <span>Course Id: </span><span>{{student.course_id}}</span>
                <span>User Id: </span><span>{{student.user_id}}</span>
            </div>
            <button @click="getFeeRecords">Get Payment Records for Selected Student</button>
            <div v-for="fee in feeRecords">
                <span>Payment: </span><span>{{fee.payment}}</span>
                <span>Course Id: </span><span>{{fee.course_id}}</span>
                <span>User Id: </span><span>{{fee.user_id}}</span>
            </div>
            <br>
            <br>
            <input  v-model="fee">
            <button @click="payFee">Pay Fee for Selected Student</button>
        </div>
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
                            this.getStudents()
                            this.getRegisteredStudents()
                        })
            }
        },
        data() {
            return {
                mode: 'view',
                students: [],
                selectedStudent: {},
                registeredStudents: [],
                feeRecords: [],
                fee: 0,
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
            },
            getStudents() {
                this.$http.get('https://wendo-stage.herokuapp.com/student/school/' + this.$route.params.schoolId).then(
                    response => {
                        this.students = response.data
                    })
            },
            selectStudent(std) {
                this.selectedStudent = std
            },
            getRegisteredStudents() {
                this.$http.get('https://wendo-stage.herokuapp.com/course_user/course/' + this.$route.params.courseId).then(
                    response => {
                        this.registeredStudents = response.data
                    })
            },
            registerStudent() {
                const pl = {
                    user_id: this.selectedStudent.id,
                    course_id: this.$route.params.courseId
                }
                this.$http.post('https://wendo-stage.herokuapp.com/course_user/', pl, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.getRegisteredStudents()
                    }
                )
            },
            getFeeRecords() {
                this.$http.get('https://wendo-stage.herokuapp.com/payment/user/' + this.selectedStudent.id +
                    '/course/' + this.$route.params.courseId).then(
                    response => {
                        this.feeRecords = response.data
                    })
            },
            payFee() {
                const pl = {
                    user_id: this.selectedStudent.id,
                    course_id: this.$route.params.courseId,
                    payment: this.fee
                }
                this.$http.post('https://wendo-stage.herokuapp.com/payment/', pl, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.getFeeRecords()
                    }
                )
            }
         }
    }
</script>
<style>

</style>