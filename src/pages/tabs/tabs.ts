import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import {SchoolPage} from '../school/school';
import {CoursePage} from '../course/course';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SchoolPage;
  tab2Root = CoursePage;
  tab3Root = HomePage;

  constructor() {

  }
}
