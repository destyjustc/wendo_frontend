import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../services/store';

@Component({
    selector: 'page-user',
    templateUrl: 'user.html'
})
export class UserPage {

    user: any = [];

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    ionViewWillEnter() {
        let userId = this.store.getUserId();
        this.http.get<Array<Object>>('/user/' + userId)
            .subscribe(data => {
                this.user = data;
                this.user['password'] = this.user['password'].replace(/./g, '*');
            }, error => {
                console.error(error);
            })
    }
}
