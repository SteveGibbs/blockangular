import {HttpHandler, HttpRequest, HttpInterceptor} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';

/**
 * Using auth-interceptor to add the token whenever a http request is made
 * so only authorised users can add, edit or delete posts.  Get requests can still
 * be seen by everyone.  The authService is being injected into this service to provide
 * the token.  Need to add next so that the api continues to the next method and progresses
 * once the interception has been made and the token added to the http request.
 */

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();
    /**
     * clone the request and add token to the clone rather than modifying the original request which could have unknown and unwanted impacts
     */
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });
    return next.handle(authRequest);
  }
}
