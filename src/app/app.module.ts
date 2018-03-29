import {NgModule, ErrorHandler, APP_INITIALIZER} from '@angular/core';
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

import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SchoolPage} from '../pages/school/school';
import {CoursePage} from '../pages/course/course';
import {CreateCoursePage} from '../pages/course/create-course/create-course';
import {EditCoursePage} from '../pages/course/edit-course/edit-course';
import {ViewCoursePage} from '../pages/course/view-course/view-course';

export class ApiInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const apiReq = req.clone({url: `http://wendo-stage.herokuapp.com${req.url}`});
        return next.handle(apiReq);
    }
}

@NgModule({
    declarations: [
        MyApp,
        StudentPage,
        CoursePage,
        SchoolPage,
        TabsPage,
        CreateStudentPage,
        EditStudentPage,
        CreateCoursePage,
        EditCoursePage,
        ViewCoursePage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        StudentPage,
        CoursePage,
        SchoolPage,
        TabsPage,
        CreateStudentPage,
        EditStudentPage,
        CreateCoursePage,
        EditCoursePage,
        ViewCoursePage
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
            multi: true,
        }
    ]
})
export class AppModule {
}
