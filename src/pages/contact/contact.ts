import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage implements OnInit {

  constructor(public navCtrl: NavController, private http: HttpClient) {
  }

  ngOnInit() {
      this.http.get('http://wendo-stage.herokuapp.com/student/')
          .subscribe(data => {

              console.log(data);

          });
  }

}
