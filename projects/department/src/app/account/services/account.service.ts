import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { storageKey } from '../../shared/resources/constant';
import { StorageService } from '../../shared/storages/storage.service';
import { Account, User } from '../models';
import { AccountHttpService } from './account-http.service';

@Injectable({ providedIn: 'root' })
export class AccountService implements OnDestroy
{
  private accountSubject: BehaviorSubject<Account>;
  public account: Observable<Account>;

  constructor(
    private router: Router,
    private storageService: StorageService,
    private accountHttpService: AccountHttpService,
  )
  {
    const account = storageService.get<Account>(storageKey.USER);
    this.accountSubject = new BehaviorSubject<Account>(account ? account : {} as Account);
    this.account = this.accountSubject.asObservable();
  }

  ngOnDestroy(): void
  {
    throw new Error('Method not implemented.');
  }

  public get accountValue(): Account
  {
    return this.accountSubject.value;
  }

  logout(): void
  {
    if (this.accountValue?.token)
    {
      this.accountHttpService.logOut().subscribe({
        next: () =>
        {
          this.routeToLogin();
        },
        error: error => { }
      });
    } else
    {
      this.routeToLogin();
    }
  }

  getSessions(): Observable<User>
  {
    return this.accountHttpService.getSessions();
  }

  routeToLogin(): void
  {
    this.router.navigate(['/account/login']);
  }
}
