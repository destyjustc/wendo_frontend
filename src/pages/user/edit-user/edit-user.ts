import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavController } from 'ionic-angular';
import {StoreService} from '../../../services/store';

@Component({
    selector: 'page-edit-user',
    templateUrl: 'edit-user.html'
})
export class EditUserPage {

    user: any = [];
    userId: string;

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {
        this.userId = this.store.getUserId();
    }

    ionViewWillEnter() {
        this.http.get<Object>('/user/' + this.userId)
            .subscribe(data => {
                this.user = data;
                this.user['password'] = this.user['password'].replace(/./g, '*');
            }, error => {
                console.error(error);
            })
    }

    editUser() {
        this.http.put('/user/' + this.userId, this.user)
            .subscribe(data => {
                this.navCtrl.pop();
            }, error => {
                console.error(error);
            })
    }

}
