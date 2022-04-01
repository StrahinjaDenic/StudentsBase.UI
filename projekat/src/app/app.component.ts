import { LoginService } from './services/login.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Applicon example app';

  constructor (
    public loginService: LoginService,
    private router: Router
  ) {}
  // isAuthenticated = false;

  logout() {
    this.loginService.islogin = false;
    //this.router.navigate(['/login']);
    this.router.navigateByUrl('/login');
  }
}
