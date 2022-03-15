import {Injectable} from "@angular/core";
import {IUser} from "../interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private http: HttpClient) {

  }

  login(user: IUser): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      'http://localhost:5000/auth/login',
      user,
      {withCredentials: true}
    )
      .pipe(
        tap({
          next: ({token}) => {

          }
        })
      )
  }

  updateAccessCookie(){
    return this.http.get('http://localhost:3000/updateAccessToken', {
      withCredentials: true,
    });
  }

  registration() {

  }
}
