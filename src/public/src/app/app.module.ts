import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule }    from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login.component';
import { ProfileComponent } from './components/profile.component';
import { ErrorInterceptor, JwtInterceptor } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';

const routes : Routes = [{
  path: 'login',
  component: LoginComponent
}, {
  path: 'profile',
  component: ProfileComponent,
  canActivate: [AuthGuard]
}, {
  path: '**',
  redirectTo: 'profile',
  pathMatch: 'full'
}];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes, {useHash: true}),
    HttpClientModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatListModule
  ],
  declarations: [AppComponent, LoginComponent, ProfileComponent],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
