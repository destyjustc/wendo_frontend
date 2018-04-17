import { Component } from '@angular/core';
import {StoreService} from '../../services/store';
import {HttpClient} from '@angular/common/http';
import {NavController} from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
    selector: 'login-page',
    templateUrl: 'login.html'
})
export class LoginPage {

    username: string = '';
    password: string = '';

    constructor(public navCtrl: NavController, private store: StoreService, private http: HttpClient) {}

    login() {
        this.http.post('/auth', {
            username: this.username,
            password: this.password
        }).subscribe(data => {
            this.store.setConfigAfterLogin(data['access_token']).then(() => {
                this.navCtrl.push(TabsPage);
            });
        }, error => console.error(error));
    }
}