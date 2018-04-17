import {Component, OnDestroy} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';

import {StoreService} from '../services/store';
import {Subscription} from "rxjs/Subscription";
import {App} from 'ionic-angular';

@Component({
    templateUrl: 'app.html'
})
export class MyApp implements OnDestroy {
    rootPage: any = TabsPage;
    logoutSubscription: Subscription;

    constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private store: StoreService, private app: App) {

        if (store.isAuth) {
            this.rootPage = TabsPage;
        } else {
            this.rootPage = LoginPage;
        }

        this.logoutSubscription = this.store.logoutSubject.asObservable().subscribe(() => {
            this.app.getRootNav().setRoot(LoginPage);
        });

        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }

    ngOnDestroy() {
        this.logoutSubscription.unsubscribe();
    }
}
