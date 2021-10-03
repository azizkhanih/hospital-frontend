import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSessionResponse, User } from '../models';
import { environment } from './../../../environments/environment';
import { CreateSession } from './../models/interfaces/create-session.model';
import { CreateUser } from './../models/interfaces/create-user.model';

@Injectable({ providedIn: 'root' })
export class AccountHttpService
{
  constructor(private http: HttpClient) { }

  private apiUrl = environment.apiUrl;

  createUser(createUser: CreateUser): Observable<User>
  {
    return this.http.post<User>(`${ this.apiUrl }/users`, createUser);
  }

  login(createSession: CreateSession): Observable<CreateSessionResponse>
  {
    return this.http.post<CreateSessionResponse>(`${ this.apiUrl }/sessions`, createSession);
  }

  logOut(): Observable<boolean>
  {
    return this.http.delete<boolean>(`${ this.apiUrl }/sessions`);
  }

  getSessions(): Observable<User>
  {
    return this.http.get<User>(`${ this.apiUrl }/sessions`);
  }
}
