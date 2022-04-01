import { LoginService } from './login.service';
import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard /*implements CanActivate*/ {

  constructor(
    private loginService: LoginService,
    private router: Router) {}

 /* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree>  {
    return this.loginService.islogin.pipe(map (loggedIn => loggedIn? true: this.router.parseUrl('/login')));
  }*/


}




// import { Injectable } from '@angular/core';
// import { Router, CanActivate } from '@angular/router';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuardService implements CanActivate {

//   constructor(public authService: AuthService, public router: Router) {}

//   async canActivate(): Promise<boolean> {
//     if (!await this.authService.checkAuthenticated()) {
//       await this.router.navigate(['login']);
//       return false;
//     }
//     return true;
//   }
// }
