import {Injectable} from "@angular/core";
import {IUser} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import ITokenData from "../interfaces/token-data.interface";
import IUserRegister from "../interfaces/user-register.interface";
import {UserId} from "../types/userId.type";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private authUrl: string = 'http://localhost:5000/auth/'

  constructor(
    private http: HttpClient,
  ) {

  }

  login(user: IUser): Observable<ITokenData> {
    return this.http.post<ITokenData>(
      `${this.authUrl}login`,
      user,
      {withCredentials: true}
    )
  }

  logout(): void {
    this.http.post(`${this.authUrl}logout`, {withCredentials: true}
    )
  }

  getAuthUser(userId: UserId) {
    return this.http.get<IUser>(`http://localhost:5000/users/${userId}`)
  }

  updateAccessToken() {
    return this.http.get(
      `${this.authUrl}updateAccessToken`,
      {withCredentials: true}
    );
  }

  registration(registerDto: IUserRegister): Observable<ITokenData> {
    return this.http.post<ITokenData>(
      `${this.authUrl}registration`,
      registerDto,
      {withCredentials: true}
    )
  }
}
