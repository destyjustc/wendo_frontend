import HelloWorld from '@/components/HelloWorld'
import Student from '@/components/students/Student'
import StudentList from '@/components/students/StudentList'
import Teacher from '@/components/teachers/Teacher'
import TeacherList from '@/components/teachers/TeacherList'

export const routes = [
    {
        path: '/',
        name: 'HelloWorld',
        component: HelloWorld
    },
    {
        path: '/studentlist',
        component: StudentList
    },
    {
        path: '/student/:studentId',
        component: Student
    },
    {
        path: '/teacherlist',
        component: TeacherList
    },
    {
        path: '/teacher',
        component: Teacher
    }
]
