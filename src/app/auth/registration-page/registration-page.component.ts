import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../classes/material.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    email: new FormControl(
      'dmitriyskrill@gmail.com',
      [
        Validators.required,
        Validators.email
      ]
    ),
    login: new FormControl(
      'dmitriyskrill',
      [
        Validators.required
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
    this.auth.registration(this.form?.value)
  }

}
