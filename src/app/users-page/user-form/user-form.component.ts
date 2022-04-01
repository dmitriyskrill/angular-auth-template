import {Component, OnInit} from '@angular/core';
import {IUser} from "../../shared/users/interfaces/user.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {HttpUsersService} from "../../shared/users/http-users.service";
import {of, switchMap} from "rxjs";
import {MaterialService} from "../../shared/classes/material.service";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  isNew = true
  user: IUser | undefined | null

  constructor(
    private route: ActivatedRoute,
    private httpUsersService: HttpUsersService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            if (params['id']) {
              this.isNew = false
              return this.httpUsersService.getById(params['id'])
            }

            return of(null)
          }
        )
      )
      .subscribe({
        next: (user: IUser | null) => {
          this.user = user
        },
        error: error => MaterialService.toast(error.error.message)
      })
  }

}
