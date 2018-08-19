import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title : string = 'GHFetch';
  userLoggedIn: boolean;

  constructor(private authService : AuthService) {}

  ngOnInit() {
    this.userLoggedIn = !!this.authService.getLoggedInUser();
    this.authService.isUserLoggedIn().subscribe(loggedIn => {
      this.userLoggedIn = loggedIn;
    });
  }
}
