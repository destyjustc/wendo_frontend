import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-edit-teacher',
  templateUrl: 'edit-teacher.html'
})
export class EditTeacherPage {

  teacher: Object = {};

  constructor(public navCtrl: NavController, private http: HttpClient, private navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.http.get<Array<Object>>('/teacher/school/' + this.navParams.get('schoolId') + '/' + this.navParams.get('teacherId'))
      .subscribe(data => {
        this.teacher = data;
      }, error => {
        console.error(error);
      })
  }

  editTeacher() {
    this.http.put('/teacher/school/' + this.navParams.get('schoolId') + '/' + this.navParams.get('teacherId'), this.teacher)
      .subscribe(data => {
        this.navCtrl.pop();
      }, error => {
        console.error(error);
      })
  }

}
