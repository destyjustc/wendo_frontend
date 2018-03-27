import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-edit-course',
    templateUrl: 'edit-course.html'
})
export class EditCoursePage {

    course: Object = {};

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

    editCourse() {
        this.http.put('/course/school/' + this.navParams.get('schoolId') + '/' + this.navParams.get('courseId'), this.course)
            .subscribe(data => {
                this.navCtrl.pop();
            }, error => {
                console.error(error);
            })
    }

    removeCourse() {
        this.http.delete('/course/school/' + this.navParams.get('schoolId') + '/' + this.navParams.get('courseId'))
            .subscribe(data => {
                this.navCtrl.pop();
            }, error => {
                console.error(error);
            })
    }

}
