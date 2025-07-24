import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxIonicFileUploadComponent } from './ngx-ionic-file-upload.component';
import { EventEmitter } from '@angular/core';

describe('NgxIonicFileUploadComponent', () => {
  let component: NgxIonicFileUploadComponent;
  let fixture: ComponentFixture<NgxIonicFileUploadComponent>;
  let defaultLabelText = 'Drag & Drop or click here to select file(s)';
  let dropContainerSpy: jasmine.SpyObj<HTMLDivElement>;
  let hiddenInputSpy: jasmine.SpyObj<HTMLInputElement>;
  let dropContainerEventListenerSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxIonicFileUploadComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxIonicFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    // dropContainerSpy = spyOnAllFunctions(component.dropContainer.nativeElement);
    dropContainerEventListenerSpy = spyOn(
      component.dropContainer.nativeElement,
      'addEventListener'
    );
    hiddenInputSpy = spyOnAllFunctions(component.fileInput.nativeElement);
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('default accepts field should be empty array for accepts all', () => {
    expect(component.config.accepts?.length).toBe(0);
  });
  it('default allow field should be false', () => {
    expect(component.config.multiple).toBe(false);
  });
  it('default allowDirectories field should be false', () => {
    expect(component.config.allowDirectories).toBe(false);
  });
  it('default maxFileSize field should be undefined', () => {
    expect(component.config.maxFileSize).toBe(undefined);
  });
  it('default uploadIcon field should be cloud-outline', () => {
    expect(component.config.uploadIcon).toBe('cloud-upload');
  });
  it(
    "default containerMainLabelText field should be '" + defaultLabelText + "'",
    () => {
      expect(component.config.containerMainLabelText).toBe(defaultLabelText);
    }
  );
  it('default containerHelpLabelText field should be empty', () => {
    expect(component.config.containerHelpLabelText).toBeFalsy();
  });
  it('default fileChanged handler field should be defined', () => {
    expect(component.filesChanged).toBeInstanceOf(EventEmitter);
  });
  it('should add event handler for drop container click', () => {
    expect(dropContainerEventListenerSpy).toHaveBeenCalled();
  });
});

export const createMockFile = (
  fileName: string,
  fileType: string,
  mockData: BlobPart[]
) => {
  return new File(mockData, fileName, { type: fileType });
};
