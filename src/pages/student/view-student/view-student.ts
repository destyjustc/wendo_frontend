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
    currentSegment = 'studentInfo'
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
        this.http.get<Array<Object>>('/course/school/' + this.navParams.get('schoolId'))
            .subscribe((data: Object[]) => {
                this.http.get<Array<Object>>('/course_user/school/' + this.navParams.get('schoolId') + '/user/' + this.navParams.get('studentId'))
                    .subscribe((data2: Object[]) => {
                        console.log(data2);
                        for (let i = 0; i < data2.length; i++) {
                            for (let j = 0; j < data.length; j++) {
                                if (data2[i]['course_id'] === data[j]['id']) {
                                    data[j]['registered'] = true;
                                    data[j]['course_user_id'] = data2[i]['id']
                                }
                            }
                        }
                        this.courses = data;
                    });
            }, error => {
                console.error(error);
            })
    }

    goToEditStudentPage() {
        this.navCtrl.push(EditStudentPage, {schoolId: this.navParams.get('schoolId'), studentId: this.navParams.get('studentId')});
    }

    goToPaymentPage(course) {
        this.navCtrl.push(PaymentPage, {courseId: course['id'], studentId: this.navParams.get('studentId')});
    }
}
