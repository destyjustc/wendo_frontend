import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StoreService {

    schoolId: string;

    constructor(private http: HttpClient) {}

    public load(): Promise<void> {
        return this.http.get<Array<Object>>('/school/').toPromise()
            .then(data => {
                if (data && data.length > 0) {
                    this.setSchoolId(data[0]['id']);
                }
            }).catch(err => {
                console.error(err);
            });
    }

    setSchoolId(schoolId) {
        this.schoolId = schoolId;
    }

    getSchoolId() {
        return this.schoolId;
    }

}