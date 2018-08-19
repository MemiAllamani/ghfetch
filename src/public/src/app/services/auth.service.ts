import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


/** Model */

export class User {
  token: string
}

/** Service */

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isUserAuthenticated : Subject<boolean>;

  constructor(private http: HttpClient) {
    this.isUserAuthenticated = new Subject<boolean>();
    let isLoggedIn = !!this.getLoggedInUser();
    this.isUserAuthenticated.next(isLoggedIn);
   }

  login(user : string, pass: string) {
    return this.http.post<User>('/auth/login', { 
      username: user, password: pass 
    }).pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.isUserAuthenticated.next(true);
        }
        return user;
    }));
  }

  isUserLoggedIn() : Observable<boolean> {
    return this.isUserAuthenticated.asObservable();
  }

  getLoggedInUser() : User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    return this.http.post<any>('/auth/logout', {}).subscribe(() => {
      this.isUserAuthenticated.next(false);
      localStorage.removeItem('currentUser');
    }, () => {
      localStorage.removeItem('currentUser');
    });
  }
}


/**
 * Authentication error interceptor
 */
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(err => {
          if (err.status === 401 && this.authService.getLoggedInUser()) {
              this.authService.logout();
              location.reload(true);
          }
          
          const error = err.error.message || err.statusText;
          return throwError(error);
      }))
  }
}

/**
 * Authentication jwt token interceptor
 */
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let currentUser = this.authService.getLoggedInUser();
    if (currentUser && currentUser.token) {
      request = request.clone({
          setHeaders: { 
              Authorization: `${currentUser.token}`
          }
      });
    }
    
    return next.handle(request);
  }
}