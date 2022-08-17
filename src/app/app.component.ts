import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  myForm = new FormGroup({
    image: new FormControl(),
  });

  image: string = '';

  @ViewChild('myImage') myImage: ElementRef<HTMLInputElement>;

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

    this.myImage.nativeElement.src = base64 + '';
  }

  handleSubmit() {
    console.log('Handle submit!');
    console.log(this.myForm.value);
  }
}
