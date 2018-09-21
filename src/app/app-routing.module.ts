import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { FilesComponent } from './pages/files/files.component';
import { AddFileComponent } from './pages/add-file/add-file.component';
import { FileCategoryComponent } from './pages/file-category/file-category.component';
import { RegisterComponent } from './pages/register/register.component';
import { UsersComponent } from './pages/users/users.component';
import { AdminGuard } from './guard/admin.guard';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'files', component: FilesComponent, canActivate: [AuthGuard] },
  { path: 'add-file', component: AddFileComponent, canActivate: [AuthGuard] },
  { path: 'categories', component: FileCategoryComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'users', component: UsersComponent, canActivate: [AuthGuard,AdminGuard] },
  { path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard] }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})




export class AppRoutingModule { }
