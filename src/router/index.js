import HelloWorld from '@/components/HelloWorld';
import StudentList from '@/components/students/StudentList';
import TeacherList from '@/components/teachers/TeacherList';

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
        path: '/teacherlist',
        component: TeacherList
    }
];
