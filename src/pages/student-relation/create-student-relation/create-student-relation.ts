import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {HttpClient} from '@angular/common/http';
import {StoreService} from '../../../services/store';

@Component({
    selector: 'create-student-relation-page',
    templateUrl: 'create-student-relation.html'
})
export class CreateStudentRelationPage {

    students: any = [];
    relationGroups: any = [];
    newRelationGroup: any = {};
    pickExist = true;
    relation: any = {};
    selectedGroup: any;
    selectedStudent: any;

    constructor(public navCtrl: NavController, private http: HttpClient, private store: StoreService) {

    }

    ionViewWillEnter() {
        let schoolId = this.store.getSchoolId();
        this.http.get<Array<Object>>('/clue_group/school/' + schoolId)
            .subscribe(data => {
                this.relationGroups = [...data];
                if (this.relationGroups.length <= 0) {
                    this.pickExist = false;
                }
            }, error => {
                console.error(error);
            })
        this.http.get<Array<Object>>('/student/school/' + schoolId)
            .subscribe(data => {
                this.students = [...data];
            }, error => {
                console.error(error);
            })
    }

    createRelation() {
        if (this.pickExist) {
            this.http.post<Object>('/clue/', {
                clue_group_id: this.selectedGroup.id,
                student_id: this.selectedStudent.id,
                content: this.relation.content,
                deadline: this.relation.deadline
            }).subscribe(clueRes => {
                console.log('clueRes', clueRes);
            }, error => console.error(error));
        } else {
            this.http.post<any>('/clue_group/', {
                created_by: this.store.getUserId(),
                assigned_to: this.store.getUserId(),
                name: this.newRelationGroup.name
            }).subscribe(groupRes => {
                console.log('groupRes', groupRes);
                this.http.post<Object>('/clue/', {
                    clue_group_id: groupRes.id,
                    student_id: this.selectedStudent.id,
                    content: this.relation.content,
                    deadline: this.relation.deadline
                }).subscribe(clueRes => {
                    console.log('clueRes', clueRes);
                }, error => console.error(error));
            }, error => console.error(error));
        }

    }
}