import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {CreateCoursePage} from './create-course/create-course';
import {EditCoursePage} from './edit-course/edit-course';
import {StoreService} from '../../services/store';

@Component({
    selector: 'course-page',
    templateUrl: 'course.html'
})
export class CoursePage {

    courses: any = [];

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    ionViewWillEnter() {
        this.http.get<Array<Object>>('/course/school/' + this.store.getSchoolId())
            .subscribe(data => {
                this.courses = [...data];

            }, error => {
                console.error(error);
            })
    }

    goToCreateCoursePage() {
        this.navCtrl.push(CreateCoursePage);
    }

    goToEditCoursePage(course) {
        this.navCtrl.push(EditCoursePage, {courseId: course.id});
    }

}
