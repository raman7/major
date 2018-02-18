import { MappingComponent } from './mapping/mapping.component';
import { AdminComponent } from './admin/admin.component';
import {ModuleWithProviders} from '@angular/core'
import {Routes,RouterModule} from '@angular/router'
import {EditorComponent} from './editor/editor.component'
import {RegisterUserComponent} from './register-user/register-user.component'
import {FacultyLoginComponent} from './faculty-login/faculty-login.component'
import {PostQuestionComponent} from './post-question/post-question.component'
 
import {LoginComponent} from './login/login.component'
import {DashboardComponent} from './dashboard/dashboard.component'
import {AppComponent} from './app.component'
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth.guard';


export const router: Routes = [{
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'registerUser',
    loadChildren: './register-user/register.module#RegisterModule'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'adminLogin',
    component: AdminComponent
  },
  {
    path: 'adminDashboard',
    canActivate:[AuthGuard],
    component: MappingComponent
  },
  {
    path: 'facultyLogin',
    loadChildren: './faculty-login/faculty-login.module#FacultyLoginModule'
  },
  {
    path: 'postQuestion',
    canActivate:[AuthGuard],
    component: PostQuestionComponent
  },
  {
    path: 'editor',
    canActivate: [AuthGuard],
    component: EditorComponent
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: './dashboard/dashboard.module#DashboardModule'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];





export const routes:ModuleWithProviders = RouterModule.forRoot(router);