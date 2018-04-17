import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class StoreService {

    isAuth: boolean = false;
    schoolId: string;
    userId: string;
    // schools: Object[];

    constructor(private http: HttpClient) {}

    public load(): Promise<void> {
        // let schoolPromise = this.http.get<Array<Object>>('/school/').toPromise();
        // let loginPromise = this.http.post<Object>('/auth', {username: '6', password: '6'}).toPromise();
        // return Promise.all([schoolPromise, loginPromise])
        //     .then(data => {
        //         if (data && data.length > 0) {
        //             this.setSchoolId(data[0][0]['id']);
        //         }
        //         // console.log(data);
        //     }).catch(err => {
        //         console.error(err);
        //     });
        if (!!localStorage.getItem('authToken')) {
            let authToken = localStorage.getItem('authToken');
            let httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type':  'application/json',
                    'Authorization': 'JWT ' + authToken
                })
            };
            let authPromise = this.http.get<Object>('/whoami/', httpOptions).toPromise();
            return authPromise.then(data => {
                this.isAuth = true;
                this.setSchoolId(data['school_id']);
                this.setUserId(data['id']);
            }).catch(error => {
                console.error(error);
                localStorage.removeItem('authToken');
            });
        }
        return Promise.resolve();
    }

    public setConfigAfterLogin(authToken): Promise<void> {
        localStorage.setItem('authToken', authToken);
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json',
                'Authorization': 'JWT ' + authToken
            })
        };
        let authPromise = this.http.get<Object>('/whoami/', httpOptions).toPromise();
        return authPromise.then(data => {
            this.isAuth = true;
            this.setSchoolId(data['school_id']);
            this.setUserId(data['id']);
        }).catch(error => {
            console.error(error);
        });
    }

    setSchoolId(schoolId) {
        this.schoolId = schoolId;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    getSchoolId() {
        return this.schoolId;
    }

    getUserId() {
        return this.userId;
    }

    // getSchools() {
    //     return this.schools;
    // }

}