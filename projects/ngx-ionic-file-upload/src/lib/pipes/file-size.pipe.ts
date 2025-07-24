import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  private readonly sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  transform(bytes: number): string {
    if (typeof bytes !== 'number' || isNaN(bytes) || bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${parseFloat((bytes / Math.pow(1024, i)).toFixed(2))} ${this.sizes[i]}`;
  }
}
