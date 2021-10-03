import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'projects/utilities/src/lib/toast/toast.service';
import { MustMatch } from '../../../shared/helpers/validators/must-match.validator';
import { CreateUser } from './../../models/interfaces/create-user.model';
import { CreateUserService } from './create-user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit
{
  createUserForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';
  isCreateUser = true;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private createUserService: CreateUserService,
    private toastService: ToastService,
    private translateService: TranslateService
  )
  { }

  ngOnInit()
  {
    this.createUserForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'passwordConfirmation')
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get form() { return this.createUserForm.controls; }

  onSubmit()
  {
    this.submitted = true;

    // stop here if form is invalid
    if (this.createUserForm.invalid)
    {
      return;
    }

    this.loading = true;

    const user = {
      name: this.form.name.value,
      email: this.form.email.value,
      password: this.form.password.value,
      passwordConfirmation: this.form.passwordConfirmation.value
    } as CreateUser;

    this.createUserService.createUser(user).subscribe({
      next: () =>
      {
        this.toastService.showSuccess(this.translateService.instant("MESSAGE.PLEASE_LOG_IN"));
        this.router.navigate(['/account/login']);
      },
      error: error =>
      {
        this.loading = false;
      }
    });
  }
}
