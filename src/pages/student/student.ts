import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {CreateStudentPage} from './create-student/create-student';
import {StoreService} from '../../services/store';
import {ViewStudentPage} from './view-student/view-student';

@Component({
    selector: 'page-student',
    templateUrl: 'student.html'
})
export class StudentPage {

    students: any = [];
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

    goToCreateStudentPage() {
        this.navCtrl.push(CreateStudentPage, {schoolId: this.selectedSchool['id']});
    }

    goToViewStudentPage(student) {
        this.navCtrl.push(ViewStudentPage, {schoolId: this.selectedSchool['id'], studentId: student.id});
    }

    selectSchool(school) {
        this.selectedSchool = school;
        this.http.get<Array<Object>>('/student/school/' + this.selectedSchool['id'])
            .subscribe(data => {
                this.students = [...data];

            }, error => {
                console.error(error);
            })
    }

    reselectSchool() {
        this.selectedSchool = null;
    }
}
