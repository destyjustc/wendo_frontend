import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import { StoreService } from '../../../services/store';

@Component({
    selector: 'page-create-course',
    templateUrl: 'create-course.html'
})
export class CreateCoursePage {

    course: Object = {
        name: '',
        description: '',
        fee: ''
    };

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    createCourse() {
        this.http.post('/course/school/' + this.store.getSchoolId(), this.course)
            .subscribe(data => {
                this.navCtrl.pop();
            }, error => {
                console.error(error);
            })
    }

}
