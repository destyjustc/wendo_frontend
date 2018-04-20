import { Component } from '@angular/core';

import { StudentPage } from '../student/student';
import { TeacherPage } from '../teacher/teacher';
import { CoursePage } from '../course/course';
import { StudentRelationPage } from '../student-relation/student-relation';
import { UserPage } from '../user/user';
import { StoreService } from '../../services/store';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  tab1Root = UserPage;
  tab2Root = CoursePage;
  tab3Root = StudentPage;
  tab4Root = StudentRelationPage;
  tab5Root = TeacherPage;
  role: string;

  constructor(private store: StoreService) {
    this.role = this.store.getUserRole();
  }
}
