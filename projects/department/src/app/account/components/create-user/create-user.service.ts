import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models';
import { AccountHttpService } from '../../services';
import { CreateUser } from './../../models/interfaces/create-user.model';

@Injectable({ providedIn: 'root' })
export class CreateUserService
{
  constructor(
    private accountHttpService: AccountHttpService) { }

  createUser(user: CreateUser): Observable<User>
  {
    return this.accountHttpService.createUser(user);
  }
}
