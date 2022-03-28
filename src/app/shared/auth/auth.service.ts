import {Injectable} from "@angular/core";
import {IUser} from "../users/interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject, tap} from "rxjs";
import {TokenDto} from "./dto/token.dto";
import {UserId} from "../users/userId.type";

@Injectable({providedIn: 'root'})
export class AuthService {
  private _accessToken: string | null = null
  private _refreshToken: string | null = null
  private _userId: UserId | null = null

  constructor(private http: HttpClient) {

  }

  get accessToken(): string | null {
    return this._accessToken || localStorage.getItem('accessToken') || null
  }

  set accessToken(token: string | null) {
    console.log('accessToken', token)
    this._accessToken = token
    if (typeof token === 'string') {
      localStorage.setItem('accessToken', token)
    } else {
      localStorage.removeItem('accessToken')
    }
  }

  get refreshToken(): string | null {
    return this._refreshToken || localStorage.getItem('refreshToken') || null
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
    return this._userId || localStorage.getItem('userId') || null
  }

  set userId(userId: UserId | null) {
    this._userId = userId
    if (typeof userId === 'string') {
      localStorage.setItem('userId', userId)
    } else {
      localStorage.removeItem('userId')
    }
  }

  set tokenDto(tokenDto: TokenDto) {
    console.log('tokenDto', tokenDto)
    this.accessToken = tokenDto.accessToken
    this.refreshToken = tokenDto.refreshToken
    this.userId = tokenDto.userId
  }

  login(user: IUser): Observable<{ tokenDto: TokenDto }> {
    console.log('login', user)
    return this.http.post<{ tokenDto: TokenDto }>(
      'http://localhost:5000/auth/login',
      user,
      {withCredentials: true}
    )
      .pipe(
        // tap(
        //   ({tokenDto}) => {
        //     console.log('login', tokenDto)
        //     if (!tokenDto) return
        //     console.log('login', tokenDto)
        //     this.tokenDto = tokenDto
        //   }
        // )
        tap({
          next: ({tokenDto}) => {
            console.log('login', tokenDto)
            if (!tokenDto) return
            console.log('login', tokenDto)
            this.tokenDto = tokenDto
          }
        })
      )
  }

  getAuthUser(userId: number) {
    return this.http.get<IUser>(
      `http://localhost:5000/users/${userId}`
    )
  }

  updateAccessCookie() {
    return this.http.get('http://localhost:3000/updateAccessToken', {
      withCredentials: true,
    });
  }

  registration() {

  }


}
