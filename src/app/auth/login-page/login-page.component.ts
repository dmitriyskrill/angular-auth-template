import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({
    email: new FormControl(
      'dmitriyskrill@gmail.com',
      [
        Validators.required,
        Validators.email
      ]
    ),
    password: new FormControl("123456", [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  constructor(    private auth: AuthService  ) {
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {

  }

  onSubmit(): void {
    this.form?.disable()
    this.auth.login(this.form?.value)
  }
}
