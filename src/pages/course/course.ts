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
    schools: any = [];
    selectedSchool: any = null;

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    ionViewWillEnter() {
        this.schools = this.store.getSchools();
        if(this.selectedSchool) {
            this.selectSchool(this.selectedSchool);
        }
    }

    goToCreateCoursePage() {
        this.navCtrl.push(CreateCoursePage, {schoolId: this.selectedSchool['id']});
    }

    goToViewCoursePage(course) {
        this.navCtrl.push(ViewCoursePage, {schoolId: this.selectedSchool['id'], courseId: course.id});
    }

    selectSchool(school) {
        this.selectedSchool = school;
        this.http.get<Array<Object>>('/course/school/' + this.selectedSchool['id'])
            .subscribe(data => {
                this.courses = [...data];

            }, error => {
                console.error(error);
            })
    }

    reselectSchool() {
        this.selectedSchool = null;
    }
}
