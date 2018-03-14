import HelloWorld from '@/components/HelloWorld'
import Student from '@/components/students/Student'
import StudentList from '@/components/students/StudentList'
import Teacher from '@/components/teachers/Teacher'
import TeacherList from '@/components/teachers/TeacherList'
import School from '@/components/schools/School'
import SchoolList from '@/components/schools/SchoolList'
import Class from '@/components/classes/class'
import ClassList from '@/components/classes/classList'

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
        path: '/student/school/:schoolId/:studentId',
        component: Student
    },
    {
        path: '/teacherlist',
        component: TeacherList
    },
    {
        path: '/teacher/:teacherId',
        component: Teacher
    },
    {
        path: '/schoollist',
        component: SchoolList
    },
    {
        path: '/school/:schoolId',
        component: School
    },
    {
        path: '/classlist',
        component: ClassList
    },
    {
        path: '/class/:classId',
        component: Class
    }
]
