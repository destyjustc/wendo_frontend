import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../services/store';
import {CreateStudentRelationPage} from './create-student-relation/create-student-relation'

@Component({
    selector: 'student-relation-page',
    templateUrl: 'student-relation.html'
})
export class StudentRelationPage {

    relationGroups: any = [];

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    goToCreateRelationPage() {
        this.navCtrl.push(CreateStudentRelationPage);
    }

    ionViewWillEnter() {
        let schoolId = this.store.getSchoolId();
        this.http.get<Array<Object>>('/clue_group/school/' + schoolId)
            .subscribe(data => {
                this.relationGroups = [...data];
                this.relationGroups.forEach(group => {
                    this.http.get<Array<Object>>('/clue/clue_group/' + group.id)
                        .subscribe(cluesRes => {
                            group.relations = [...cluesRes];
                        }, error => {
                            console.error(error);
                        });
                })
            }, error => {
                console.error(error);
            })
    }
    //
    // createRelationGroup() {
    //     this.http.post<Object>('/clue_group/', {
    //         created_by: 'b8b12d25-ec15-431d-84a2-7a00f75d2aaa',
    //         assigned_to: 'b8b12d25-ec15-431d-84a2-7a00f75d2aaa'
    //     }).subscribe(data => {
    //         console.log(data)
    //     }, error => console.error(error));
    // }
}