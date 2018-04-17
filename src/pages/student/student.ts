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

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    ionViewWillEnter() {
        let schoolId = this.store.getSchoolId();
        this.http.get<Array<Object>>('/student/school/' + schoolId)
            .subscribe(data => {
                this.students = [...data];
            }, error => {
                console.error(error);
            })
    }

    goToCreateStudentPage() {
        let schoolId = this.store.getSchoolId();
        this.navCtrl.push(CreateStudentPage, {schoolId: schoolId});
    }

    goToViewStudentPage(student) {
        let schoolId = this.store.getSchoolId();
        this.navCtrl.push(ViewStudentPage, {schoolId: schoolId, studentId: student.id});
    }
}
