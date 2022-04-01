import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../shared/users/interfaces/user.interface";
import {HttpUsersService} from "../shared/users/http-users.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss']
})
export class UsersPageComponent implements OnInit, OnDestroy {
  private aSubUsers: Subscription | undefined
  users: Array<IUser> = []

  constructor(private httpUsersService: HttpUsersService) {

  }

  ngOnInit(): void {
    this.aSubUsers = this.httpUsersService.get().subscribe({
      next: (users)=>{
        this.users = users
      }
    })
  }

  ngOnDestroy(): void {
    this.aSubUsers?.unsubscribe()
  }
}
