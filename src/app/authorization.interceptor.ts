/**
 * This interceptor is based on a
 * [codingthesmartway post](https://codingthesmartway.com/angular-4-3-httpclient-accessing-rest-web-services-with-angular/)
 * Main objective of this file is to append Authorization header to all requests if token is defined
 */

import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";


import {Observable} from "rxjs/index";
import {environment} from "../environments/environment";

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {

  constructor(

  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    if (req.url.includes(environment.bibles_org_base_url))
    {
      const authReq = req.clone({
        headers: req.headers.set("Authorization", "Basic " + btoa(environment.bibles_org_api_key + ":x"))
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
