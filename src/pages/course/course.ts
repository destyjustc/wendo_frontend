import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {CreateCoursePage} from './create-course/create-course';
import {StoreService} from '../../services/store';
import {ViewCoursePage} from './view-course/view-course';

@Component({
    selector: 'course-page',
    templateUrl: 'course.html'
})
export class CoursePage {

    courses: any = [];

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    ionViewWillEnter() {
        let schoolId = this.store.getSchoolId();
        this.http.get<Array<Object>>('/course/school/' + schoolId)
            .subscribe(data => {
                this.courses = [...data];

            }, error => {
                console.error(error);
            })
    }

    goToCreateCoursePage() {
        let schoolId = this.store.getSchoolId();
        this.navCtrl.push(CreateCoursePage, {schoolId: schoolId});
    }

    goToViewCoursePage(course) {
        let schoolId = this.store.getSchoolId();
        this.navCtrl.push(ViewCoursePage, {schoolId: schoolId, courseId: course.id});
    }
}
