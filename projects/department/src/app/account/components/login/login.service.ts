import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSession, User } from '../../models';
import { AccountHttpService } from '../../services';

@Injectable({ providedIn: 'root' })
export class LoginService
{
  constructor(
    private accountHttpService: AccountHttpService) { }

  login(createSession: CreateSession): Observable<User>
  {
    return this.accountHttpService.login(createSession);
  }
}
