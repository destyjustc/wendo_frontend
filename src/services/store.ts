import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class StoreService {

    isAuth: boolean = false;
    schoolId: string;
    userId: string;
    logoutSubject: Subject<any> = new Subject();
    role: string;

    constructor(private http: HttpClient) {}

    public load(): Promise<void> {
        if (!!localStorage.getItem('authToken')) {
            let authToken = localStorage.getItem('authToken');
            return this.setConfig(authToken);
        }
        return Promise.resolve();
    }

    public setConfigAfterLogin(authToken): Promise<void> {
        return this.setConfig(authToken);
    }

    setConfig(authToken) {
        localStorage.removeItem('authToken');
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
            this.setUserRole(data['role']['name']);
            localStorage.setItem('authToken', authToken);
        }).catch(() => {
            // console.error(error);
        });
    }

    logout() {
        this.isAuth = false;
        this.logoutSubject.next('logout');
        // return Promise.resolve();
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

    setUserRole(role) {
      this.role = role;
    }

    getUserRole() {
      return this.role;
    }
}
