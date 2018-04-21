import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { StoreService } from '../../services/store';
import {CreateTeacherPage} from './create-teacher/create-teacher';
import {ViewTeacherPage} from './view-teacher/view-teacher';

@Component({
  selector: 'page-teacher',
  templateUrl: 'teacher.html'
})
export class TeacherPage {
  teachers: any = [];

  constructor(
    public navCtrl: NavController,
    private http: HttpClient,
    private store: StoreService
  ) {}

  ionViewWillEnter() {
    let schoolId = this.store.getSchoolId();
    this.http.get<Array<Object>>('/teacher/school/' + schoolId).subscribe(
      data => {
        this.teachers = [...data];
        console.log('teachers ', this.teachers);
      },
      error => {
        console.error(error);
      }
    );
  }

  goToCreateTeacherPage() {
    let schoolId = this.store.getSchoolId();
    this.navCtrl.push(CreateTeacherPage, { schoolId: schoolId });
  }

  goToViewTeacherPage(teacher) {
    let schoolId = this.store.getSchoolId();
    this.navCtrl.push(ViewTeacherPage, {
      schoolId: schoolId,
      teacherId: teacher.id
    });
  }
}
