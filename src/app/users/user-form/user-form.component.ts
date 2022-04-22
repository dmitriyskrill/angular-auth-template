import {Component, OnInit} from '@angular/core';
import {IUser} from "../interfaces/user.interface";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {UsersHttpService} from "../services/users-http.service";
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
    private usersHttpService: UsersHttpService,
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
              return this.usersHttpService.getById(params['id'])
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
