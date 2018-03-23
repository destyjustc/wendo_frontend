import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { StoreService } from '../../../services/store';

@Component({
    selector: 'page-create-student',
    templateUrl: 'create-student.html'
})
export class CreateStudentPage {

    student: Object = {
        username: '',
        password: '',
        firstname: '',
        lastname: ''
    };

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    createStudent() {
        this.http.post('/student/school/' + this.store.getSchoolId(), this.student)
            .subscribe(data => {
                this.navCtrl.pop();
            }, error => {
                console.error(error);
            })
    }

}
