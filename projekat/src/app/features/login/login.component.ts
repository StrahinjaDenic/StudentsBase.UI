import { Router } from '@angular/router';
import { ValidationResponse } from './../models/validation-response';
import { first } from 'rxjs/operators';
import { LoginService } from './../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private fb: FormBuilder,
    private router: Router) {
    this.loginForm = this.fb.group({
      "id": 0,
      "userName": [null, Validators.required],
      "password":  [null, Validators.required]
    })
   }

  ngOnInit(): void {

    console.error("test");
  }

  login() {
    //if (this.loginForm.valid) {
      this.loginService.loginCheck(this.loginForm.value).pipe(first())
      .subscribe((x: ValidationResponse) => {
        if (x.isSuccess) {
          this.router.navigateByUrl('/students');
        }
      })
    //}
  }

}
