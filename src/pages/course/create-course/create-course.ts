import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavController, NavParams} from 'ionic-angular';

@Component({
    selector: 'page-create-course',
    templateUrl: 'create-course.html'
})
export class CreateCoursePage {

    course: Object = {
        name: '',
        description: '',
        fee: '',
        school_id: ''
    };

    constructor(public navCtrl: NavController, private http: HttpClient, private navParams: NavParams) {

    }

    createCourse() {
        this.course['school_id'] = this.navParams.get('schoolId');
        this.http.post('/course/school/' + this.navParams.get('schoolId'), this.course)
            .subscribe(data => {
                this.navCtrl.pop();
            }, error => {
                console.error(error);
            })
    }

}
