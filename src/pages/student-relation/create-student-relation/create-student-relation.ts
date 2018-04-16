import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../../services/store';

@Component({
    selector: 'create-student-relation-page',
    templateUrl: 'create-student-relation.html'
})
export class StudentRelationPage {

    relationGroup: any = {

    };

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }
}