import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import {EditStudentPage} from '../edit-student/edit-student';
import {PaymentPage} from '../payment/payment';

@Component({
    selector: 'page-view-student',
    templateUrl: 'view-student.html'
})
export class ViewStudentPage {

    student: Object = {};
    showCourses: boolean = false;
    courses: any;

    constructor(public navCtrl: NavController, private http: HttpClient, private navParams: NavParams) {

    }

    ionViewWillEnter() {
        this.http.get<Array<Object>>('/student/school/' + this.navParams.get('schoolId') + '/' + this.navParams.get('studentId'))
            .subscribe(data => {
                this.student = data;
            }, error => {
                console.error(error);
            })
    }

    goToEditStudentPage() {
        this.navCtrl.push(EditStudentPage, {schoolId: this.navParams.get('schoolId'), studentId: this.navParams.get('studentId')});
    }

    getCourses() {
        this.showCourses = true;
        this.http.get<Array<Object>>('/course/school/' + this.navParams.get('schoolId'))
            .subscribe((data: Object[]) => {
                this.courses = data;
            }, error => {
                console.error(error);
            })
    }

    displayStudentInfo() {
        this.showCourses = false;
    }

    goToPaymentPage(course) {
        this.navCtrl.push(PaymentPage, {courseId: course['id'], studentId: this.navParams.get('studentId')});
    }
}
