import { Pipe, PipeTransform } from '@angular/core';
import { Language } from '../models/language';

@Pipe({
  name: 'filterLanguages',
})
export class FilterLanguagesPipe implements PipeTransform {
  transform(languages: Language[], args?: string) {
    if (!languages) {
      return [];
    }

    if (!args) {
      return languages;
    }

    args = args.toLowerCase();

    return languages.filter((language) => {
      return (
        language.name.toLowerCase().includes(args)
      );
    });
  }
}
