import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IUser} from "./interfaces/user.interface";
import {Observable} from "rxjs";
import {UserId} from "./userId.type";

@Injectable()
export class HttpUsersService {
  private usersUrl: string = 'http://localhost:5000/users/'

  constructor(private http: HttpClient) {

  }

  get(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.usersUrl)
  }

  getById(id: UserId): Observable<IUser> {
    const url = this.usersUrl + id
    return this.http.get<IUser>(url)
  }
}
