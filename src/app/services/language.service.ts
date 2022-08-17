import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Guid } from 'guid-typescript';
import { Language } from '../models/language';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private url: string = 'http://localhost:5000/languages';

  private languageSource = new BehaviorSubject<Language>({
    id: null,
    name: null,
    description: null,
    createdBy: null,
    image: null,
  });
  selectedLanguage = this.languageSource.asObservable();

  // private formStateSource = new BehaviorSubject<boolean>(true);
  // formStateClear = this.formStateSource.asObservable();

  constructor(private http: HttpClient) {}

  getLanguages(): Observable<Language[]> {
    return this.http.get<Language[]>(this.url);
  }

  getLanguage(id: number): Observable<Language> {
    const modUrl = this.url + '/' + id;
    return this.http.get<Language>(modUrl);
  }

  addLanguage(language: Language): Observable<Language> {
    return this.http.post<Language>(this.url, language, httpOptions);
  }

  updateLanguage(language: Language): Observable<Language> {
    const modUrl: string = `${this.url}/${language.id}`;
    return this.http.put<Language>(modUrl, language, httpOptions);
  }

  deleteLanguage(id: number): Observable<Language> {
    const modUrl = this.url + '/' + id;
    return this.http.delete<Language>(modUrl, httpOptions);
  }

  setFormLanguage(language: Language) {
    this.languageSource.next(language);
  }

  resetFormState() {
    this.languageSource = new BehaviorSubject<Language>({
      id: null,
      name: null,
      description: null,
      createdBy: null,
      image: null,
    });

    this.selectedLanguage = this.languageSource.asObservable();
  }
}
