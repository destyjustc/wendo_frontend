import {NgModule, ErrorHandler, APP_INITIALIZER, Injectable} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {StudentPage} from '../pages/student/student';
import {TabsPage} from '../pages/tabs/tabs';

import {CreateStudentPage} from '../pages/student/create-student/create-student';
import {EditStudentPage} from '../pages/student/edit-student/edit-student';

import {StoreService} from '../services/store';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {HttpClientModule} from '@angular/common/http';

import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {CoursePage} from '../pages/course/course';
import {CreateCoursePage} from '../pages/course/create-course/create-course';
import {EditCoursePage} from '../pages/course/edit-course/edit-course';
import {ViewCoursePage} from '../pages/course/view-course/view-course';
import {ViewStudentPage} from '../pages/student/view-student/view-student';
import {PaymentPage} from '../pages/student/payment/payment';

import {StudentRelationPage} from '../pages/student-relation/student-relation';
import {CreateStudentRelationPage} from '../pages/student-relation/create-student-relation/create-student-relation';
import {LoginPage} from '../pages/login/login'
import {UserPage} from '../pages/user/user';
import {EditUserPage} from '../pages/user/edit-user/edit-user';
import {TeacherPage} from '../pages/teacher/teacher';
import {CreateTeacherPage} from '../pages/teacher/create-teacher/create-teacher';
import {ViewTeacherPage} from '../pages/teacher/view-teacher/view-teacher';
import {EditTeacherPage} from '../pages/teacher/edit-teacher/edit-teacher';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
    constructor(public store: StoreService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({url: `http://wendo-stage.herokuapp.com${req.url}`});
        if (this.store.isAuth) {
            let authToken = localStorage.getItem('authToken');
            const tokenReq = apiReq.clone({
                setHeaders: {
                    Authorization: `JWT ${authToken}`
                }
            });
            // return next.handle(tokenReq);
            return next.handle(tokenReq).do((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                    // do stuff with response if you want
                }
            }, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 401) {
                        this.store.logout();
                    }
                }
            });
        }
        return next.handle(apiReq);
    }
}

@NgModule({
    declarations: [
        MyApp,
        StudentPage,
        CoursePage,
        TabsPage,
        CreateStudentPage,
        EditStudentPage,
        CreateCoursePage,
        EditCoursePage,
        ViewCoursePage,
        ViewStudentPage,
        PaymentPage,
        StudentRelationPage,
        CreateStudentRelationPage,
        LoginPage,
        UserPage,
        EditUserPage,
        TeacherPage,
        CreateTeacherPage,
        ViewTeacherPage,
        EditTeacherPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp, {
            backButtonText: '返回',
            backButtonIcon: null
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        StudentPage,
        CoursePage,
        TabsPage,
        CreateStudentPage,
        EditStudentPage,
        CreateCoursePage,
        EditCoursePage,
        ViewCoursePage,
        ViewStudentPage,
        PaymentPage,
        StudentRelationPage,
        CreateStudentRelationPage,
        LoginPage,
        UserPage,
        EditUserPage,
        TeacherPage,
        CreateTeacherPage,
        ViewTeacherPage,
        EditTeacherPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        StoreService,
        {
            provide: APP_INITIALIZER,
            useFactory: (config: StoreService) => () => config.load(),
            deps: [StoreService],
            multi: true
        },
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ApiInterceptor,
            // deps: [StoreService, NavController],
            multi: true,
        }
    ]
})
export class AppModule {
}
