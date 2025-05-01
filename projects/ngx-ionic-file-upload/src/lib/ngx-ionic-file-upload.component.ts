import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  IonButton,
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
import { retry } from 'rxjs';

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
    FileSizePipe,
  ],
})
export class NgxIonicFileUploadComponent implements AfterViewInit, OnInit {
  @ViewChild('dropContainer')
  public dropContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('fileInput')
  public fileInput!: ElementRef<HTMLInputElement>;

  /**
   * Array of file types the input should accept. Default is to accept all.
   */
  @Input() public accepts: string[] = [];

  /**
   * Should the file upload accept multiple files.
   * @default false
   */
  @Input() public multiple: boolean = false;

  /**
   * Allow the file input to accept directories.
   * @default false
   */
  @Input() public allowDirectories: boolean = false;

  /**
   * Max file size allowed in bytes. Default is no limit on size.
   */
  @Input() public maxFileSize?: number;

  /**
   * Icon for the upload container. Centered above label.
   * @default 'cloud-upload'
   */
  @Input() public uploadLabelIcon: string = 'cloud-upload';

  /**
   * Label text for upload container.
   * @default 'Drag & Drop or click here to select file(s)'
   */
  @Input() public uploadLabelText?: string =
    'Drag & Drop or click here to select file(s)';

  /**
   * Text centered below label text.
   * Typically used to specifiy which types of files are allowed and/or the maximum file size allowed.
   */
  @Input() public uploadHelpText?: string = undefined;

  /**
   * Emits file changes
   */
  @Output() fileChanged: EventEmitter<File[]> = new EventEmitter();

  public files: File[] = [];

  constructor() {
    addIcons({ cloudUpload, checkmarkCircle, trashOutline });
  }

  ngAfterViewInit(): void {
    this.addHandlers();
  }

  ngOnInit(): void {}

  public fileChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;

    if (!files?.length) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (this.accepts.indexOf(file.type) === -1) continue;
      this.files.push(file);
    }
  }
  public removeFile(index: number) {
    this.files.splice(index, 1);
  }

  private addHandlers() {
    this.dropContainer.nativeElement.addEventListener('click', (event) => {
      preventDefaults(event);
      this.fileInput.nativeElement.click();
    });
    this.dropContainer.nativeElement.addEventListener(
      'dragenter',
      preventDefaults
    );
    this.dropContainer.nativeElement.addEventListener(
      'dragleave',
      preventDefaults
    );
  }

  public onDragOver(event: DragEvent) {
    preventDefaults(event);
    this.dropContainer.nativeElement.classList.add('highlight');
  }

  public onDrop(event: DragEvent) {
    preventDefaults(event);
    let files = Array.from(event.dataTransfer?.files || []);
    if (!files?.length) return;
    if (!this.multiple) {
      files = files.slice(0, 0);
    }
    if (this.accepts?.length) {
      files = files.filter((f) => this.accepts.indexOf(f.type) !== -1);
    }
    if (this.maxFileSize) {
      files = files.filter((f) => f.size <= this.maxFileSize!);
    }
    this.files = this.multiple ? this.files.concat(files) : files;
    this.dropContainer.nativeElement.classList.remove('highlight');
    this.fileChanged.emit(this.files);
  }
}

export const preventDefaults = (event: Event) => {
  event.preventDefault();
};
