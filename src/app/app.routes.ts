import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { SignupComponent } from './components/signup/signup';
import { EmployeeListComponent } from './components/employee-list/employee-list';
import { AddEmployeeComponent } from './components/add-employee/add-employee';
import { ViewEmployeeComponent } from './components/view-employee/view-employee';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  { path: 'employees', component: EmployeeListComponent },
  { path: 'add', component: AddEmployeeComponent },

  {
    path: 'view/:id',
    component: ViewEmployeeComponent,
    data: { renderMode: 'client' }
  },
  {
    path: 'edit/:id',
    component: EditEmployeeComponent,
    data: { renderMode: 'client' }
  },

  { path: '**', redirectTo: 'signup' }
];