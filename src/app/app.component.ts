import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly description$ = this.translateService.get('static.description');

  constructor(private translateService: TranslateService) {}
}
