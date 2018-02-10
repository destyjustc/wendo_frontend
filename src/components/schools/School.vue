<template>
    <div>
        <h3>
            School
        </h3>
        <div>
            School Id: <input v-if="mode !== 'view'" v-model="school.id"><span v-else>{{school.id}}</span>
        </div>
        <div>
            School Name: <input v-if="mode !== 'view'" v-model="school.name"><span v-else>{{school.name}}</span>
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
                console.log('need to call get school API')
            }
        },
        data() {
            return {
                mode: 'view',
                school: {
                    id: null,
                    name: null
                }
            }
        },
        methods: {
            createSchool() {
                const sch = {
                    id: this.school.id,
                    name: this.school.name
                }
                console.log('need to call create teacher API', sch)
            },
            editSchool() {
                this.mode = 'edit'
            },
            saveSchool() {
                this.mode = 'view'
            }
        }
    }
</script>
<style>

</style>