import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { ProfileComponent } from './components/profile.component';

const routes : Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'profile',
  component: ProfileComponent
}, {
  path: '',
  redirectTo: 'profile',
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    MatToolbarModule,
    MatButtonModule
  ],
  declarations: [AppComponent, LoginComponent, ProfileComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
