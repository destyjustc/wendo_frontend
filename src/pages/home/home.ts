import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { CreateStudentPage } from './create-student/create-student';
import { StoreService } from '../../services/store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  students: any = [
      'first student',
      'second student'
  ];

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

}
