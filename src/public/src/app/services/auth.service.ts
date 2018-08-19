import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  login(user : string, pass: string) {
    return this.http.post<any>('/auth/login', { user, pass })
    .pipe(map(user => {
        if (user && user.token) {
          localStorage.setItem('currentUser', JSON.stringify(user));
        }
        return user;
    }));
  }

  getLoggedInUser() : User {
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout() {
    localStorage.removeItem('currentUser');
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
          if (err.status === 401) {
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