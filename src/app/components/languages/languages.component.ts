import { Component, OnInit, OnDestroy } from '@angular/core';
import { Guid } from 'guid-typescript';
import { Language } from 'src/app/models/language';

import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
})
export class LanguagesComponent implements OnInit, OnDestroy {
  languages: Language[] = [];

  searchValue: string; // za ngModel zbog pretrage

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService
      .getLanguages()
      .subscribe((languages) => (this.languages = languages));
  }

  ngOnDestroy(): void {
    this.languageService.resetFormState();
  }

  addLanguage(language: Language) {
    this.languageService
      .addLanguage(language)
      .subscribe((language) => this.languages.push(language));
  }

  editLanguage(language: Language) {
    this.languageService.setFormLanguage(language);
  }

  updateLanguage(language: Language) {
    this.languageService.updateLanguage(language).subscribe((language) => {
      this.languages.forEach((tempLanguage: Language, index: number) => {
        if (tempLanguage.id === language.id) {
          this.languages[index] = language;
        }
      });
    });
  }

  deleteLanguage(id: number) {
    if (window.confirm('Do you really want to delete this language?')) {
      this.languageService.deleteLanguage(id).subscribe(() => {
        // delete from local array
        this.languages.forEach((language, i) => {
          if (id === language.id) {
            this.languages.splice(i, 1);
          }
        });
      });

      this.languageService.setFormLanguage({});
      // this.languageService.resetFormState();
    }
  }
}
