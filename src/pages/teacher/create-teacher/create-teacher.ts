import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-create-teacher',
  templateUrl: 'create-teacher.html'
})
export class CreateTeacherPage {

  teacher: Object = {
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: ''
  };

  constructor(public navCtrl: NavController, private http: HttpClient, private navParams: NavParams) {

  }

  createTeacher() {
    this.http.post('/teacher/school/' + this.navParams.get('schoolId'), this.teacher)
      .subscribe(data => {
        this.navCtrl.pop();
      }, error => {
        console.error(error);
      })
  }

}
