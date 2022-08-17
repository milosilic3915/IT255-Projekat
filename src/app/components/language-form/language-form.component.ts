import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';
import { Language } from 'src/app/models/language';

import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
})
export class LanguageFormComponent implements OnInit, OnDestroy {
  languageForm: FormGroup = this.formBuilder.group({
    id: '',
    name: ['', [Validators.required, Validators.minLength(2)]],
    description: ['', [Validators.required, Validators.minLength(2)]],
    createdBy: ['', [Validators.required, Validators.minLength(1)]],
    image: [''],
  });

  selectedLanguage: Language = {};
  base64Image: string = '';

  loading: boolean = false;

  editing: boolean = false;

  @Output() addLanguageEvent: EventEmitter<Language> = new EventEmitter();
  @Output() updateLanguageEvent: EventEmitter<Language> = new EventEmitter();

  @ViewChild('myImage') myImage: ElementRef<HTMLInputElement>;

  constructor(
    private languageService: LanguageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;

    this.languageService.selectedLanguage.subscribe((language) => {
      this.selectedLanguage = language;

      console.log('Language - Form state', this.selectedLanguage);

      // console.log(this.selectedLanguage.id);

      if (this.selectedLanguage.id) {
        this.editing = true;
        this.languageForm.controls['id'].setValue(this.selectedLanguage.id);
        this.languageForm.controls['name'].setValue(this.selectedLanguage.name);
        this.languageForm.controls['description'].setValue(
          this.selectedLanguage.description
        );
        this.languageForm.controls['createdBy'].setValue(
          this.selectedLanguage.createdBy
        );

      } else {
        this.onCancel();
      }
    });
  }

  ngOnDestroy(): void {
    this.onCancel();
  }

  private convertBase64(file: Blob) {
    console.log('Size: ', file.size);

    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  async uploadImage(event: any) {
    const file = event.target.files[0];
    const base64 = await this.convertBase64(file);

    console.log('Base64: ', base64);
    this.base64Image = base64 + '';
    // this.myImage.nativeElement.src = base64 + '';
  }

  onSubmit() {
    if (!this.editing) {
      // Add new language

      const language: Language = this.languageForm.value as Language; // without id

      language.image = this.base64Image;

      // set id
      language.id = 0;

      // console.log('Add language', language);

      this.addLanguageEvent.emit(language);
    } else {
      // Update language

      const language: Language = this.languageForm.value as Language; // with id

      language.image = this.selectedLanguage.image;

      // console.log('Update language', language);

      // emit event
      this.updateLanguageEvent.emit(language);
    }

    this.onCancel();
  }

  onCancel() {
    this.editing = false;

    this.languageForm.reset();

    this.selectedLanguage = {};
  }

  getValidationClass(formControlName: string): string {
    return (this.languageForm.get(formControlName).touched ||
      this.languageForm.get(formControlName).dirty) &&
      this.languageForm.get(formControlName).hasError('required')
      ? 'is-invalid'
      : '' || this.languageForm.get(formControlName).hasError('minlength')
      ? 'is-invalid'
      : '' ||
        ((this.languageForm.get(formControlName).touched ||
          this.languageForm.get(formControlName).dirty) &&
          !this.languageForm.get(formControlName).invalid)
      ? 'is-valid'
      : '';
  }
}
