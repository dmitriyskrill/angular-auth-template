import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/auth/auth.service";

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit{
  constructor(private auth: AuthService) {
  }

  ngOnInit() {

  }

}
