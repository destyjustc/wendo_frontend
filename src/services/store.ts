import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class StoreService {

    isAuth: boolean = false;
    schoolId: string;
    userId: string;

    constructor(private http: HttpClient) {}

    public load(): Promise<void> {
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
            localStorage.setItem('authToken', authToken);
        }).catch(error => {
            console.error(error);
        });
    }

    setSchoolId(schoolId) {
        this.schoolId = schoolId;
    }

    getSchoolId() {
        return this.schoolId;
    }

    setUserId(userId) {
        this.userId = userId;
    }

    getUserId() {
        return this.userId;
    }

}