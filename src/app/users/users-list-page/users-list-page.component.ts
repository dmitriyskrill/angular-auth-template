import {Component, OnDestroy, OnInit} from '@angular/core';
import {IUser} from "../interfaces/user.interface";
import {UsersHttpService} from "../services/users-http.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit, OnDestroy {
  private aSubUsers: Subscription | undefined
  users: Array<IUser> = []

  constructor(private usersHttpService: UsersHttpService) {

  }

  ngOnInit(): void {
    this.aSubUsers = this.usersHttpService.get().subscribe({
      next: (users)=>{
        this.users = users
      }
    })
  }

  ngOnDestroy(): void {
    this.aSubUsers?.unsubscribe()
  }
}
