import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {Observable, tap} from "rxjs";

import {UserId} from "../types/userId.type";

import {IUser} from "../interfaces/user.interface";
import ITokenData from "../interfaces/token-data.interface";
import RegisterDto from "../interfaces/user-register.interface";

import {AuthHttpService} from "./auth-http.service";
import IUserRegister from "../interfaces/user-register.interface";

@Injectable({providedIn: "root"})
export class AuthService {

  private _accessToken: string | null = null
  private _refreshToken: string | null = null
  private _userId: UserId | null = null
  private _authUser: IUser | null = null

  constructor(
    private authHttpService: AuthHttpService,
    private router: Router
  ) {
  }

  get accessToken(): string | null {
    if (!this._accessToken && localStorage.getItem('accessToken')) {
      this.accessToken = localStorage.getItem('accessToken')
    }
    return this._accessToken || null
  }

  set accessToken(token: string | null) {
    this._accessToken = token
    if (typeof token === 'string') {
      localStorage.setItem('accessToken', token)
    } else {
      localStorage.removeItem('accessToken')
    }
  }

  get refreshToken(): string | null {
    if (!this._refreshToken && localStorage.getItem('refreshToken')) {
      this.refreshToken = localStorage.getItem('refreshToken')
    }
    return this._refreshToken || null
  }

  set refreshToken(token: string | null) {
    this._refreshToken = token
    if (typeof token === 'string') {
      localStorage.setItem('refreshToken', token)
    } else {
      localStorage.removeItem('refreshToken')
    }
  }

  get userId(): UserId | null {
    if (!this._userId && localStorage.getItem('userId')) {
      this.userId = localStorage.getItem('userId')
    }
    return this._userId || null
  }

  set userId(userId: UserId | null) {
    this._userId = userId
    switch (typeof userId) {
      case "string":
        localStorage.setItem('userId', userId)
        break
      case "number":
        localStorage.setItem('userId', userId.toString())
        break
      default:
        localStorage.removeItem('userId')
    }
  }

  set tokenData(tokenData: ITokenData) {
    this.accessToken = tokenData.accessToken
    this.refreshToken = tokenData.refreshToken
    this.userId = tokenData.userId
  }

  get isAuthenticated(): boolean {
    return !!this.userId
  }

  get authUser(): IUser | null {
    return this._authUser
  }

  set authUser(user: IUser | null) {
    this._authUser = user
  }

  clearTokenDto() {
    this.accessToken = null
    this.refreshToken = null
    this.userId = null
  }

  login(user: IUser): void {
    this.authHttpService.login(user).subscribe((tokenData: ITokenData) => {
      if (!tokenData) return
      this.tokenData = tokenData
    })
  }

  logout(): void {
    this.clearTokenDto()
    this.router.navigate(['/login'])
    this.authHttpService.logout()
  }

  getAuthUser(userId: UserId) {
    return this.authHttpService.getAuthUser(userId)
      .subscribe((authUser: IUser) => {
        this.authUser = authUser
      })
  }

  updateAccessToken() {
    return this.authHttpService.updateAccessToken();
  }

  registration(userRegister: IUserRegister) {
    this.authHttpService.registration(userRegister)
      .subscribe((tokenData: ITokenData) => {
        if (!tokenData) return
        this.tokenData = tokenData
      })
  }


}
