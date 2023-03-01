// eslint-disable-next-line no-restricted-imports
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { GetFieldType, Paths, Translations } from './translation.models';

export abstract class TypedTranslateService extends TranslateService {
  override get<Path extends Paths<Translations>>(
    key: Path,
    interpolateParams?: Record<string, string>
  ): Observable<GetFieldType<Translations, Path>> {
    return super.get(key, interpolateParams) as Observable<GetFieldType<Translations, Path>>;
  }

  override getTranslation(lang: string): Observable<Translations> {
    return super.getTranslation(lang) as Observable<Translations>;
  }
}
