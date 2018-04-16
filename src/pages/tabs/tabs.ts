import { Component } from '@angular/core';

import { StudentPage } from '../student/student';
import { DashboardPage } from '../dashboard/dashboard';
import { CoursePage } from '../course/course';
import { StudentRelationPage } from '../student-relation/student-relation';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = DashboardPage;
  tab2Root = CoursePage;
  tab3Root = StudentPage;
  tab4Root = StudentRelationPage;

  constructor() {

  }
}
