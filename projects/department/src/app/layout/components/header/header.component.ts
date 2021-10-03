import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from './../../../account/services/account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit
{
  @Input() title = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void
  {
  }

  logout(): void
  {
    this.accountService.logout();
  }

}
