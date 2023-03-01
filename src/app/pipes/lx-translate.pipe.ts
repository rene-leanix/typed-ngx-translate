import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
// eslint-disable-next-line no-restricted-imports
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { GetFieldType, Join, Paths, Split, Translations } from '../models/translation.models';

export type GetFieldTypeForPathOrPathArray<PathOrPathArray> = GetFieldType<
  Translations,
  PathOrPathArray extends string[] ? Join<PathOrPathArray> : PathOrPathArray
>;

@Pipe({
  name: 'typedTranslate',
  pure: false // Allows to implement this pipe synchronously, as is the underlying translate pipe
})
export class TypedTranslatePipe implements PipeTransform {
  private readonly translatePipe = new TranslatePipe(this.translateService, this.changeDetectorRef);

  constructor(
    /* c8 ignore start */
    private translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef /* c8 ignore stop */
  ) {}

  /**
   * Type-safe lxTranslate pipe.
   * The key needs to be either hard-coded as a single key, e.g., 'button.save',
   * or entered as an array, e.g., [NAME, 'title'], as Angular does not yet
   * use template literal typing when strings are concatenated with +.
   */
  public transform<PathOrPathArray extends Paths<Translations> | Split<Paths<Translations>>>(
    keyStringOrArray: PathOrPathArray,
    interpolations?: Record<string, string>
  ): GetFieldTypeForPathOrPathArray<PathOrPathArray> {
    const key: string = Array.isArray(keyStringOrArray) ? keyStringOrArray.join('.') : keyStringOrArray;
    // eslint-disable-next-line no-restricted-syntax
    return this.translatePipe.transform(key, interpolations) as GetFieldTypeForPathOrPathArray<PathOrPathArray>;
  }
}
