import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CreateStudentPage } from './create-student/create-student';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  students: any = [
      'first student',
      'second student'
  ];

  constructor(public navCtrl: NavController, private http: HttpClient) {
      this.http.get('http://wendo-stage.herokuapp.com/student/')
          .subscribe(data => {
              console.log(data);
              // this.students = [...data];

          });
  }

  goToCreateStudentPage() {
      this.navCtrl.push(CreateStudentPage);
  }

}
