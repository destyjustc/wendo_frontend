import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'page-create-student',
    templateUrl: 'create-student.html'
})
export class CreateStudentPage {

    // students: any = [
    //     'first student',
    //     'second student'
    // ];

    constructor(private http: HttpClient) {

    }

}
