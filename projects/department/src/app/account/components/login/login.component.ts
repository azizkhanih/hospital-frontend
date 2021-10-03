import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'projects/utilities/src/lib/toast/toast.service';
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
    if (this.accountService.accountValue?.token)
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
      next: () =>
      {
        this.toastService.showSuccess(this.translateService.instant("MESSAGE.SUCCESSFUL_LOGIN"));
        this.router.navigate([this.returnUrl]);
      },
      error: error =>
      {
        this.loading = false;
      }
    });
  }
}
