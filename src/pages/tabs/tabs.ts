import { Component } from '@angular/core';

import { StudentPage } from '../student/student';
import { CoursePage } from '../course/course';
import { StudentRelationPage } from '../student-relation/student-relation';
import {UserPage} from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = UserPage;
  tab2Root = CoursePage;
  tab3Root = StudentPage;
  tab4Root = StudentRelationPage;

  constructor() {

  }
}
