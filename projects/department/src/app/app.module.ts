import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { SharedModule } from './shared/shared.module';
import { DepartmentCardComponent } from './components/department-card/department-card.component';

const CLIMEDO_MATERIAL_MODULES = [SharedModule];

// AOT compilation support
export function httpTranslateLoader(http: HttpClient): TranslateHttpLoader
{
  return new TranslateHttpLoader(http);
}
export function translateFactory(translate: TranslateService)
{
  return async (): Promise<void> =>
  {
    translate.setDefaultLang('en-us');
    translate.use('en-us');
    return new Promise<void>((resolve) =>
    {
      translate.onLangChange.subscribe(() =>
      {
        resolve();
      });
    });
  };
}

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    DepartmentCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    CLIMEDO_MATERIAL_MODULES,
    TranslateModule.forRoot({
      defaultLanguage: 'en-us',
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    { provide: APP_INITIALIZER, useFactory: translateFactory, deps: [TranslateService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
