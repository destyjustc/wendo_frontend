<template>
    <div>
        <h3>
            Teacher
        </h3>
        <div>
            Teacher Id: <input v-if="mode !== 'view'" v-model="teacher.id"><span v-else>{{teacher.id}}</span>
        </div>
        <div>
            Teacher Name: <input v-if="mode !== 'view'" v-model="teacher.name"><span v-else>{{teacher.name}}</span>
        </div>
        <button v-if="mode === 'create'" @click="createTeacher">Create Teacher</button>
        <button v-if="mode === 'view'" @click="editTeacher">Edit Teacher</button>
        <button v-if="mode === 'edit'" @click="saveTeacher">Save Teacher</button>
    </div>
</template>
<script>
    export default {
        created() {
            if (this.$route.params.teacherId === 'new') {
                this.mode = 'create'
            } else {
                console.log('need to call get teacher API')
            }
        },
        data() {
            return {
                mode: 'view',
                teacher: {
                    id: null,
                    name: null
                }
            }
        },
        methods: {
            createTeacher() {
                const tch = {
                    id: this.teacher.id,
                    name: this.teacher.name
                }
                console.log('need to call create teacher API', tch)
            },
            editTeacher() {
                this.mode = 'edit'
            },
            saveTeacher() {
                this.mode = 'view'
            }
        }
    }
</script>
<style>

</style>