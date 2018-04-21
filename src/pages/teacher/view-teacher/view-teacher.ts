import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';
import {EditTeacherPage} from '../edit-teacher/edit-teacher';

@Component({
  selector: 'page-view-teacher',
  templateUrl: 'view-teacher.html'
})
export class ViewTeacherPage {

  teacher: Object = {};

  constructor(public navCtrl: NavController, private http: HttpClient, private navParams: NavParams) {

  }

  ionViewWillEnter() {
    this.http.get<Array<Object>>('/teacher/school/' + this.navParams.get('schoolId') + '/' + this.navParams.get('teacherId'))
      .subscribe(data => {
        this.teacher = data;
        this.teacher['password'] = this.teacher['password'].replace(/./g, '*');
      }, error => {
        console.error(error);
      })
  }

  goToEditTeacherPage() {
    this.navCtrl.push(EditTeacherPage, {schoolId: this.navParams.get('schoolId'), teacherId: this.navParams.get('teacherId')});
  }
}
