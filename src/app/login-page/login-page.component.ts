import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../shared/auth/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  aSub: Subscription | null = null
  form: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(6)
    ])
  })

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    // this.route.queryParams.subscribe({
    //   next: (params: Params) => {
    //     if(params['registered']){
    //       // Теперь вы можете зайти в систему, используя свои данные
    //     } else if(params['accessDenied']){
    //       // Авторизуйтесь в системе
    //     }
    //   }
    // })
  }

  ngOnDestroy(): void {
    this.aSub?.unsubscribe()
  }

  onSubmit(): void {
    this.form?.disable()
    this.aSub = this.auth.login(this.form?.value).subscribe({
        next: () => {
          console.log('navigateByUrl')
          this.router.navigateByUrl('/home')
        },
        error: (error) => {
          console.log(error)
          this.form.enable()
        }
      }
    )
  }
}
