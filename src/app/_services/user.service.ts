import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDataUser, ISingleUser } from '../_interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = 'http://localhost:5001/user'

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<IDataUser>{
    return this.http.get<IDataUser>(this.url)
  }

  getUser(uid: string | null): Observable<ISingleUser>{
    return this.http.get<ISingleUser>(this.url+'/'+uid)
  }
}
