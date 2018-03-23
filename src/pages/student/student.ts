import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {CreateStudentPage} from './create-student/create-student';
import {EditStudentPage} from './edit-student/edit-student';
import {StoreService} from '../../services/store';

@Component({
    selector: 'page-student',
    templateUrl: 'student.html'
})
export class StudentPage {

    students: any = [];

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    ionViewWillEnter() {
        this.http.get<Array<Object>>('/student/school/' + this.store.getSchoolId())
            .subscribe(data => {
                this.students = [...data];

            }, error => {
                console.error(error);
            })
    }

    goToCreateStudentPage() {
        this.navCtrl.push(CreateStudentPage);
    }

    goToEditStudentPage(student) {
        this.navCtrl.push(EditStudentPage, {studentId: student.id});
    }

}
