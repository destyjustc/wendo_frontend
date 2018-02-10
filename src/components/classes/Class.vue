<template>
    <div>
        <h3>
            Class
        </h3>
        <div>
            Class Id: <input v-if="mode !== 'view'" v-model="cls.id"><span v-else>{{cls.id}}</span>
        </div>
        <div>
            Class Name: <input v-if="mode !== 'view'" v-model="cls.name"><span v-else>{{cls.name}}</span>
        </div>
        <button v-if="mode === 'create'" @click="createClass">Create Class</button>
        <button v-if="mode === 'view'" @click="editClass">Edit Class</button>
        <button v-if="mode === 'edit'" @click="saveClass">Save Class</button>
    </div>
</template>
<script>
    export default {
        created() {
            if (this.$route.params.classId === 'new') {
                this.mode = 'create'
            } else {
                console.log('need to call get class API')
            }
        },
        data() {
            return {
                mode: 'view',
                cls: {
                    id: null,
                    name: null
                }
            }
        },
        methods: {
            createClass() {
                const tch = {
                    id: this.cls.id,
                    name: this.cls.name
                }
                console.log('need to call create class API', tch)
            },
            editClass() {
                this.mode = 'edit'
            },
            saveClass() {
                this.mode = 'view'
            }
        }
    }
</script>
<style>

</style>