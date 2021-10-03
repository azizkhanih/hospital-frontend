import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastService } from 'projects/utilities/src/lib/toast/toast.service';
import { Subscription } from 'rxjs';
import { DepartmentContactPerson, DepartmentInfo } from '../../models';
import { Department } from './../../models/classes/department.model';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentComponent implements OnInit, OnDestroy
{
  routeSubscription!: Subscription;
  departmentId: string = '';

  departmentForm!: FormGroup;
  submitted = false;

  isLoading = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private changeDetectorRef: ChangeDetectorRef,
    private toastService: ToastService,
    private translateService: TranslateService
  )
  {
    this.departmentForm = this.formBuilder.group({
      departmentId: [''],
      departmentInfoForm: this.formBuilder.group({
        name: [null, [Validators.required]],
        apiKey: [null, [Validators.required]]
      }),
      departmentContactPersonForm: this.formBuilder.group({
        name: [null, [Validators.required]],
        email: [null, [Validators.required, Validators.email]],
        telephone: [null, [Validators.required]]
      })
    });
  }

  ngOnInit(): void
  {
    this.routeSubscription = this.activatedRoute.params.subscribe(params =>
    {
      this.departmentId = params['departmentId'];
      this.getDepartment(this.departmentId);
    });
  }

  ngOnDestroy(): void
  {
    this.routeSubscription?.unsubscribe();
  }

  getDepartment(departmentId: string): void
  {
    if (!departmentId)
    {
      return;
    }
    this.departmentService.getDepartment(departmentId).subscribe({
      next: (response) =>
      {
        const data = response;
        this.departmentForm.setValue({
          departmentId: data.departmentId,
          departmentInfoForm: {
            name: data.departmentInfo.name,
            apiKey: data.departmentInfo.apiKey
          },
          departmentContactPersonForm: {
            name: data.departmentContactPerson.name,
            email: data.departmentContactPerson.email,
            telephone: data.departmentContactPerson.telephone
          }
        });
        this.hideLoading();
      },
      error: () =>
      {
        this.hideLoading();
      }
    });
  }

  // convenience getter for easy access to form fields
  get departmentInfoFormControls(): any  // set to any for html binding
  {
    return this.departmentForm.controls.departmentInfoForm;
  }

  // convenience getter for easy access to form fields
  get departmentContactPersonFormControls(): any  // set to any for html binding
  {
    return this.departmentForm.controls.departmentContactPersonForm;
  }

  onSubmit(): void
  {
    this.submitted = true;
    // stop here if form is invalid
    if (this.departmentForm.invalid)
    {
      return;
    }

    const department = new Department(
      this.departmentForm.value.departmentId,
      new DepartmentInfo(
        this.departmentForm.value.departmentInfoForm.name,
        this.departmentForm.value.departmentInfoForm.apiKey),
      new DepartmentContactPerson(
        this.departmentForm.value.departmentContactPersonForm.name,
        this.departmentForm.value.departmentContactPersonForm.email,
        this.departmentForm.value.departmentContactPersonForm.telephone)
    );

    const requestObservable = !this.departmentId ?
      this.departmentService.postDepartment(department) :
      this.departmentService.putDepartment(this.departmentId, department);

    requestObservable.subscribe({
      next: () =>
      {
        this.toastService.showSuccess(this.translateService.instant("MESSAGE.THE_OPERATION_WAS_SUCCESSFUL"));
        this.router.navigate(['']);
        this.hideLoading();
      },
      error: () =>
      {
        this.hideLoading();
      }
    });
  }

  showLoading(): void
  {
    this.isLoading = true;
    this.changeDetectorRef.detectChanges();
  }

  hideLoading(): void
  {
    this.isLoading = false;
    this.changeDetectorRef.detectChanges();
  }
}
