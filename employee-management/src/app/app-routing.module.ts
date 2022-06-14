import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisplayComponent } from './display/display.component';
import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'home', component: HomeComponent},
  { path: 'edit', component: EditComponent},
  { path: 'update/:id', component: EditComponent},
  { path: 'view/:id', component: DisplayComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
