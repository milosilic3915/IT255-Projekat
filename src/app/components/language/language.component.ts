import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';
import { Language } from 'src/app/models/language';

import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
})
export class LanguageComponent implements OnInit {
  language: Language = {};

  loading: boolean = false;

  constructor(
    private languageService: LanguageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loading = true;

    const id = +this.route.snapshot.paramMap.get('id');

    this.languageService.getLanguage(id).subscribe((language) => {
      this.language = language;

      this.loading = false;
    });
  }
}
