import { Injectable, TemplateRef } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService
{
  private defaultDuration: number;
  toasts: unknown[];

  headerTextWarning = '';

  constructor()
  {
    this.defaultDuration = 4000;
    this.toasts = [];
  }

  // Push new Toasts to array with content and options
  private show(textOrTpl: string | TemplateRef<unknown>, options = {})
  {
    this.toasts.push({ textOrTpl, ...options });
  }

  // Callback method to remove Toast DOM element from view
  remove(toast: unknown): void
  {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  //todo: check ngx translate service to inject befor toast service
  showSuccess(
    message = '',
    headertext = '',
    duration = this.defaultDuration,
    autohide = true
  ): void
  {
    this.show(message, {
      headertext: headertext,
      classname: 'bg-success text-light',
      delay: duration,
      autohide: autohide,
    });
  }

  showError(
    message = '',
    headertext = '',
    duration = this.defaultDuration,
    autohide = true
  ): void
  {
    this.show(message, {
      headertext: headertext,
      classname: 'bg-danger text-light',
      delay: duration,
      autohide: autohide,
    });
  }

  showInfo(message: string, headertext = '', duration = this.defaultDuration, autohide = true): void
  {
    this.show(message, {
      headertext: headertext,
      classname: 'bg-info text-light',
      delay: duration,
      autohide: autohide,
    });
  }

  showWarning(message: string, headertext = '', duration = this.defaultDuration, autohide = true): void
  {
    this.show(message, {
      headertext: headertext,
      classname: 'bg-warning text-light',
      delay: duration,
      autohide: autohide,
    });
  }

  showDefault(
    message: string,
    headertext = this.headerTextWarning,
    duration = this.defaultDuration,
    autohide = true
  ): void
  {
    this.show(message, {
      headertext: headertext,
      classname: 'bg-light text-primary',
      delay: duration,
      autohide: autohide,
    });
  }

  showCustomToast(customTemplate: string | TemplateRef<unknown>, classname = ''): void
  {
    this.show(customTemplate, {
      classname: classname,
      delay: 3000,
      autohide: true,
    });
  }
}
