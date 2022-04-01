import { Component, OnInit } from '@angular/core';
import {AuthService} from "../shared/auth/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit(): void {
    this.auth.getAuthUser(8).subscribe({
      next: () => {
        console.log('getAuthUser')

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
