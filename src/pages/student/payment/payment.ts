import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController, NavParams } from 'ionic-angular';

@Component({
    selector: 'page-payment',
    templateUrl: 'payment.html'
})
export class PaymentPage {

    payments: any;
    amount: number = 0;
    test = new Date('2018-03-29T06:27:42.113205');

    constructor(public navCtrl: NavController, private http: HttpClient, private navParams: NavParams) {

    }

    ionViewWillEnter() {
        this.getPayments();
    }

    payFee() {
        let payload = {
            user_id: this.navParams.get('studentId'),
            course_id: this.navParams.get('courseId'),
            payment: this.amount ? this.amount : 0
        };
        this.http.post('/payment/', payload)
            .subscribe(data => {
                this.getPayments();
            }, error => {
                console.error(error);
            })
    }

    getPayments() {
        this.http.get<Array<Object>>('/payment/user/' + this.navParams.get('studentId') + '/course/' + this.navParams.get('courseId'))
            .subscribe(data => {
                this.payments = data;
            }, error => {
                console.error(error);
            })
    }
}