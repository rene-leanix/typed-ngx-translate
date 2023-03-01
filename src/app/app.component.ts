import { Component } from '@angular/core';
import { TypedTranslateService } from './models/typed-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly NAME = 'AppComponent';
  // Change the following key in an IDE to check out the type checking.
  readonly description$ = this.translateService.get('static.description');

  constructor(private translateService: TypedTranslateService) {
    // When retrieving a branch and not a leaf of the translation tree, it is now correctly typed:
    this.translateService.get('dynamic.features.someFeature').subscribe((translationObject) => {
      console.log(translationObject.label ?? 'Dynamic translations are not yet loaded...');
    });

    // This also works when the whole translation tree is loaded:
    this.translateService.getTranslation('en').subscribe((translationObject) => {
      console.log(translationObject.static.title);
    });

    // But be aware: retrieving the whole tree or branches will
    this.translateService.get('static', {name: 'ngx-translate'}).subscribe((translationObject) => {
      console.log(translationObject.title);
    });
  }
}
