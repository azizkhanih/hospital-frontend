import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateSession, CreateSessionResponse } from '../../models';
import { AccountHttpService } from '../../services';

@Injectable({ providedIn: 'root' })
export class LoginService
{
  constructor(private accountHttpService: AccountHttpService) { }

  login(createSession: CreateSession): Observable<CreateSessionResponse>
  {
    return this.accountHttpService.login(createSession);
  }
}
