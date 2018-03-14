<template>
    <div>
        <h3>
            School
        </h3>
        <div>
            School Name: <input v-if="mode !== 'view'" v-model="school.name"><span v-else>{{school.name}}</span>
        </div>
        <div>
            School Describe: <input v-if="mode !== 'view'" v-model="school.describe"><span v-else>{{school.describe}}</span>
        </div>
        <button v-if="mode === 'create'" @click="createSchool">Create School</button>
        <button v-if="mode === 'view'" @click="editSchool">Edit School</button>
        <button v-if="mode === 'edit'" @click="saveSchool">Save School</button>
    </div>
</template>
<script>
    export default {
        created() {
            if (this.$route.params.schoolId === 'new') {
                this.mode = 'create'
            } else {
                this.$http.get('https://wendo-stage.herokuapp.com/school/' + this.$route.params.schoolId).then(
                    response => {
                        this.school = response.data
                    })
            }
        },
        data() {
            return {
                mode: 'view',
                school: {
                    name: null,
                    describe: null
                }
            }
        },
        methods: {
            createSchool() {
                const sch = {
                    name: this.school.name,
                    describe: this.school.describe
                }
                this.$http.post('https://wendo-stage.herokuapp.com/school/', sch, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.school = response.data
                        this.mode = 'view'
                    }
                )
            },
            editSchool() {
                this.mode = 'edit'
            },
            saveSchool() {
                const sch = {
                    name: this.school.name,
                    describe: this.school.describe
                }
                this.$http.put('https://wendo-stage.herokuapp.com/school/' + this.school.id, sch, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(
                    response => {
                        this.school = response.data
                        this.mode = 'view'
                    }
                )
            }
        }
    }
</script>
<style>

</style>