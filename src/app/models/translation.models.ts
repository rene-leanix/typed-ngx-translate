// IMPORTANT: The following import needs to be a type-only import using `import type` to prevent the JSON from being included into this bundle.
import type * as translationJson from '../../assets/en.json';

type FixedTranslations = typeof translationJson;

interface DynamicTranslations {
  dynamic: {
    features: {
      [name: string]: {
        label: string;
        introduction?: string;
      };
    };
  };
}

/**
 * Typing for the translation object loaded into ngx-translate
 */
export type Translations = FixedTranslations & DynamicTranslations;

/**
 * Join two strings with '.'.
 * @see https://stackoverflow.com/a/65963590/6813271 for original version
*/
type JoinPair<Left, Right> = Left extends string
  ? Right extends string
    ? `${Left}${'' extends Right ? '' : '.'}${Right}`
    : never
  : never;

/**
 * Get all property paths from object <Obj>.
 * @see https://stackoverflow.com/a/65963590/6813271 for original version
 */
export type Paths<Obj> = Obj extends object
  ? {
      [Key in keyof Obj]-?: Key extends string ? Key | JoinPair<Key,Paths<Obj[Key]>> : never;
    }[keyof Obj]
  : '';

/**
 * Get type of property for path <Path> in object <Obj>.
 * @see https://dev.to/tipsy_dev/advanced-typescript-reinventing-lodash-get-4fhe for original version
 */
export type GetFieldType<Obj, Path> = Path extends `${infer Left}.${infer Right}`
  ? (Left extends keyof Obj
    ? GetFieldType<Obj[Left], Right>
    : never)
  : Path extends keyof Obj
  ? Obj[Path]
  : never;

/**
 * Get array containing all combinations of string split by occurences of '.'.
 */
export type Split<Path> = Path extends `${infer Left}.${infer Right}` ? [Left, ...Split<Right>] : [Path];

/**
 * Create path from array of segments.
 */
export type Join<Arr> = Arr extends [infer First, ...infer Rest]
  ? Rest extends []
    ? `${First & string}`
    : `${First & string}.${Join<Rest>}`
  : '';
