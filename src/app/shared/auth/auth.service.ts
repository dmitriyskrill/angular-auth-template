import {Injectable} from "@angular/core";
import {IUser} from "../users/interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {TokenDto} from "./dto/token.dto";
import {UserId} from "../users/userId.type";
import RegisterDto from "./dto/register.dto";
import {Router} from "@angular/router";

@Injectable({providedIn: 'root'})
export class AuthService {
  private authUrl: string = 'http://localhost:5000/auth/'
  private _accessToken: string | null = null
  private _refreshToken: string | null = null
  private _userId: UserId | null = null

  constructor(
    private http: HttpClient,
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

  set tokenDto(tokenDto: TokenDto) {
    this.accessToken = tokenDto.accessToken
    this.refreshToken = tokenDto.refreshToken
    this.userId = tokenDto.userId
  }

  get isAuthenticated(): boolean {
    return !!this.userId
  }

  clearTokenDto() {
    this.accessToken = null
    this.refreshToken = null
    this.userId = null
  }

  login(user: IUser): Observable<TokenDto> {
    return this.http.post<TokenDto>(
      `${this.authUrl}login`,
      user,
      {withCredentials: true}
    )
      .pipe(tap({
        next: (tokenDto) => {
          if (!tokenDto) return
          this.tokenDto = tokenDto
        }
      }))
  }

  logout(): void {
    this.clearTokenDto()
    this.router.navigate(['/login'])
    console.log('logout')
    // TODO 12
    this.http.post(
      `${this.authUrl}logout`,
      {withCredentials: true}
    )
      .pipe(tap({
        next: () => {
          console.log('logout 2')
          // this.clearTokenDto()
          // this.router.navigate(['/login'])
        }
      }))
  }

  getAuthUser(userId: number) {
    return this.http.get<IUser>(
      `http://localhost:5000/users/${userId}`
    )
  }

  updateAccessToken() {
    return this.http.get(
      `${this.authUrl}updateAccessToken`,
      {withCredentials: true});
  }

  registration(registerDto: RegisterDto): Observable<TokenDto> {
    return this.http.post<TokenDto>(
      `${this.authUrl}registration`,
      registerDto,
      {withCredentials: true}
    ).pipe(tap({
      next: (tokenDto) => {
        if (!tokenDto) return
        this.tokenDto = tokenDto
      }
    }))
  }


}
