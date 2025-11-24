import { Component, inject, DOCUMENT } from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonIcon,
  IonRow,
  IonTitle,
  IonToolbar,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { moonOutline, sunnyOutline } from 'ionicons/icons';
import { NgxIonicFileUploadComponent } from '../../../ngx-ionic-file-upload/src/lib/ngx-ionic-file-upload.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    IonHeader,
    IonToolbar,
    IonContent,
    IonTitle,
    IonButtons,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    NgxIonicFileUploadComponent,
    IonCheckbox,
  ],
})
export class AppComponent {
  title = 'ngx-ionic-file-upload-demo';
  public darkMode = true;
  private document = inject(DOCUMENT);
  private darkModeClass = 'ion-palette-dark';

  constructor() {
    addIcons({ sunnyOutline, moonOutline });
  }

  public onThemeChange() {
    if (this.darkMode) {
      this.document.documentElement.classList.remove(this.darkModeClass);
    } else {
      this.document.documentElement.classList.add(this.darkModeClass);
    }
    this.darkMode = !this.darkMode;
  }

  public onFileChange(files: File[]) {
    console.log(files);
  }
}
