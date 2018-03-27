import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-edit-student',
    templateUrl: 'edit-student.html'
})
export class EditStudentPage {

    student: Object = {};

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

    editStudent() {
        this.http.put('/student/school/' + this.navParams.get('schoolId') + '/' + this.navParams.get('studentId'), this.student)
            .subscribe(data => {
                this.navCtrl.pop();
            }, error => {
                console.error(error);
            })
    }

}
