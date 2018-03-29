import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import {EditCoursePage} from '../edit-course/edit-course';

@Component({
    selector: 'page-view-course',
    templateUrl: 'view-course.html'
})
export class ViewCoursePage {

    course: Object = {};
    showStudents: boolean = false;
    students: any;

    constructor(public navCtrl: NavController, private http: HttpClient, private navParams: NavParams) {

    }

    ionViewWillEnter() {
        this.http.get<Array<Object>>('/course/school/' + this.navParams.get('schoolId') + '/' + this.navParams.get('courseId'))
            .subscribe(data => {
                this.course = data;
            }, error => {
                console.error(error);
            })
    }

    goToEditCoursePage() {
        this.navCtrl.push(EditCoursePage, {schoolId: this.navParams.get('schoolId'), courseId: this.navParams.get('courseId')});
    }

    displayStudents() {
        this.showStudents = true;
        this.http.get<Array<Object>>('/user')
            .subscribe((data: Object[]) => {
                this.http.get<Array<Object>>('/course_user/course/' + this.navParams.get('courseId'))
                    .subscribe((data2: Object[]) => {
                        for (let i = 0; i < data2.length; i++) {
                            for (let j = 0; j < data.length; j++) {
                                if (data2[i]['user_id'] === data[j]['id']) {
                                    data[j]['registered'] = true;
                                }
                            }
                        }
                        this.students = data;
                    })
            }, error => {
                console.error(error);
            })
    }

    displayCourseInfo() {
        this.showStudents = false;
    }

    registerStudent(student) {
        let payload = {
            user_id: student.id,
            course_id: this.navParams.get('courseId')
        };
        this.http.post('/course_user/', payload)
            .subscribe(data => {
                this.displayStudents();
            }, error => {
                console.error(error);
            })
    }
}