import {Injectable} from "@angular/core";
import {IUser} from "../users/interfaces/user.interface";
import {HttpClient} from "@angular/common/http";
import {Observable, BehaviorSubject, tap} from "rxjs";

@Injectable({providedIn: 'root'})
export class AuthService {

  userProfile: BehaviorSubject<IUser> = new BehaviorSubject<IUser>({
    email: '',
    firstName: '',
    id: 0,
    lastName: '',
    phone: '',
  });

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

  profile(): Observable<IUser> {
    return this.http.get<IUser>('http://localhost:3000/user-profile', {
      withCredentials: true,
    });
  }

  saveUserToLocalStorage(user: IUser) {
    this.userProfile.next(user);
    localStorage.setItem('user-profile', JSON.stringify(user));
  }


  loadUserFromLocalStorage(): IUser {
    if (this.userProfile.value.id == 0) {
      let fromLocalStorage = localStorage.getItem('user-profile');
      if (fromLocalStorage) {
        let userInfo = JSON.parse(fromLocalStorage);
        this.userProfile.next(userInfo);
      }
    }
    return this.userProfile.value;
  }
}
