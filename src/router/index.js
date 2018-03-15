import HelloWorld from '@/components/HelloWorld'
import Student from '@/components/students/Student'
import StudentList from '@/components/students/StudentList'
import User from '@/components/users/User'
import UserList from '@/components/users/UserList'
import School from '@/components/schools/School'
import SchoolList from '@/components/schools/SchoolList'
import Course from '@/components/courses/course'
import CourseList from '@/components/courses/courseList'

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
        path: '/courselist',
        component: CourseList
    },
    {
        path: '/course/school/:schoolId/:courseId',
        component: Course
    },
    {
        path: '/userlist',
        component: UserList
    },
    {
        path: '/user/:userId',
        component: User
    },
    {
        path: '/schoollist',
        component: SchoolList
    },
    {
        path: '/school/:schoolId',
        component: School
    }
]
