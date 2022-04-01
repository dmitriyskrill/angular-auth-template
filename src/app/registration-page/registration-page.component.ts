import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/auth/auth.service";
import {Router} from "@angular/router";
import {MaterialService} from "../shared/classes/material.service";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {

  aSub: Subscription | null = null
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

  constructor(
    private auth: AuthService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.aSub?.unsubscribe()
  }

  onSubmit(): void {
    this.form?.disable()
    this.aSub = this.auth.registration(this.form?.value).subscribe({
        next: (tokenDto) => {
          this.router.navigateByUrl('/home')
        },
        error: (error) => {
          // TODO 11
          MaterialService.toast(error.error.message)
          this.form.enable()
        }
      }
    )
  }

}
