import { HttpClient, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentCardModule } from './components/department-card/department-card.module';
import { LayoutModule } from './layout/layout.module';
import { DepartmentModule } from './pages/department/department.module';
import { DepartmentsModule } from './pages/departments/departments.module';
import { SharedModule } from './shared/shared.module';

const CLIMEDO_MODULES = [SharedModule, LayoutModule, DepartmentsModule, DepartmentModule, DepartmentCardModule];

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
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    CLIMEDO_MODULES,
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
