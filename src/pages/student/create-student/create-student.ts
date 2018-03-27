import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-create-student',
    templateUrl: 'create-student.html'
})
export class CreateStudentPage {

    student: Object = {
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        email: '',
        phone: ''
    };

    constructor(public navCtrl: NavController, private http: HttpClient, private navParams: NavParams) {

    }

    createStudent() {
        this.http.post('/student/school/' + this.navParams.get('schoolId'), this.student)
            .subscribe(data => {
                this.navCtrl.pop();
            }, error => {
                console.error(error);
            })
    }

}
