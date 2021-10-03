import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'projects/utilities/src/lib/toast/toast.service';
import { Account } from '../../models';
import { CreateSession } from './../../models/interfaces/create-session.model';
import { AccountService } from './../../services/account.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit
{
  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  isLogin = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private accountService: AccountService,
    private loginService: LoginService,
    private toastService: ToastService,
    private translateService: TranslateService
  )
  {
    // redirect to main route if already logged in
    if (this.accountService.accountValue?.accessToken)
    {
      this.router.navigate(['/']);
    }
  }

  ngOnInit()
  {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  onSubmit()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid)
    {
      return;
    }

    this.loading = true;

    const createSession = {
      email: this.form.email.value,
      password: this.form.password.value,
    } as CreateSession;

    this.loginService.login(createSession).subscribe({
      next: (response) =>
      {
        const account = {
          user: {
            email: createSession.email
          },
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        } as Account;

        this.accountService.setAccountValue(account);

        this.toastService.showSuccess(this.translateService.instant("MESSAGE.SUCCESSFUL_LOGIN"));

        this.router.navigate([this.returnUrl]);
      },
      error: () =>
      {
        this.loading = false;
      }
    });
  }
}
