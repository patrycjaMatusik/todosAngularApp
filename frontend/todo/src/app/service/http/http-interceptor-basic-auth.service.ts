import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BasicAuthenticationService } from '../basic-authentication.service copy';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorBasicAuthService implements HttpInterceptor {

  constructor(
    private basicAuthService: BasicAuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    // let username = 'user'
    // let password = 'password'
    //let basicAuthenticationString = 'Basic ' + window.btoa(username + ':' + password);

    let basicAuthenticationString = this.basicAuthService.getAuthenticatedToken()
    let username = this.basicAuthService.getAuthenticatedUser()

    if (basicAuthenticationString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthenticationString
        }
      })
    }

    return next.handle(request);
  }
}
