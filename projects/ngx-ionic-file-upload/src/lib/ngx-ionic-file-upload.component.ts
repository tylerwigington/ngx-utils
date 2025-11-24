import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  input,
  Input,
  OnInit,
  output,
  Output,
  ViewChild,
} from '@angular/core';
import {
  IonButton,
  IonButtons,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonNote,
  IonRow,
  IonText,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkCircle, cloudUpload, trashOutline } from 'ionicons/icons';
import { FileSizePipe } from './pipes/file-size.pipe';

const preventDefaults = (event: Event) => {
  event.preventDefault();
};

const defaultConfig: NgxIonicFileUploadConfig = {
  accepts: [],
  multiple: false,
  allowDirectories: false,
  maxFileSize: undefined,
  uploadIcon: 'cloud-upload',
  containerMainLabelText: 'Drag & Drop or click here to select file(s)',
  containerHelpLabelText: '',
  showFileList: true,
};

@Component({
  selector: 'ngx-ionic-file-upload',
  templateUrl: './ngx-ionic-file-upload.component.html',
  styleUrl: './ngx-ionic-file-upload.component.scss',
  imports: [
    IonGrid,
    IonRow,
    IonIcon,
    IonText,
    IonNote,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    IonButtons,
    FileSizePipe,
  ],
})
export class NgxIonicFileUploadComponent implements AfterViewInit, OnInit {
  private _config: NgxIonicFileUploadConfig = defaultConfig;

  @ViewChild('dropContainer')
  public dropContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput')
  public fileInput!: ElementRef<HTMLInputElement>;

  public config = input(defaultConfig, {
    transform: (cfg: NgxIonicFileUploadConfig) => ({ ...defaultConfig, ...cfg }),
  });

  public filesChanged = output<File[]>();

  protected files: File[] = [];

  constructor() {
    addIcons({ cloudUpload, checkmarkCircle, trashOutline });
  }

  ngAfterViewInit(): void {
    this.addHandlers();
  }

  ngOnInit(): void {}

  public fileChange(event: HTMLInputEvent) {
    this.files = this.applyRules(Array.from(event.target?.files || []));
    this.filesChanged.emit(this.files);
  }

  public removeFile(index: number) {
    this.files.splice(index, 1);
    this.filesChanged.emit(this.files);
  }

  private addHandlers() {
    this.dropContainer.nativeElement.addEventListener('click', event => {
      preventDefaults(event);
      this.fileInput.nativeElement.click();
    });
    this.dropContainer.nativeElement.addEventListener('dragover', preventDefaults);
    this.dropContainer.nativeElement.addEventListener('drop', event => {
      preventDefaults(event);
      this.files = this.applyRules(Array.from(event.dataTransfer?.files || []));
      this.dropContainer.nativeElement.classList.remove('highlight');
      this.filesChanged.emit(this.files);
    });
    this.dropContainer.nativeElement.addEventListener('dragenter', event => {
      preventDefaults(event);
      this.dropContainer.nativeElement.classList.add('highlight');
    });
    this.dropContainer.nativeElement.addEventListener('dragleave', event => {
      preventDefaults(event);
      this.dropContainer.nativeElement.classList.remove('highlight');
    });
  }

  private applyRules(files: File[]) {
    if (!files || !files.length) return [];

    let filtered = [...files];
    if (!this.config().multiple) {
      filtered = [files[0]];
    }
    if (this.config().accepts?.length) {
      filtered = files.filter(f => this.config().accepts?.indexOf(f.type) !== -1);
    }
    if (!!this.config().maxFileSize) {
      filtered = files.filter(f => f.size <= this.config().maxFileSize!);
    }
    return files;
  }
}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

export interface NgxIonicFileUploadConfig {
  accepts?: string[];
  multiple?: boolean;
  allowDirectories?: boolean;
  maxFileSize?: number;
  uploadIcon?: string;
  containerMainLabelText?: string;
  containerHelpLabelText?: string;
  showFileList?: boolean;
}
