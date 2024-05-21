import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slice'
})
export class SlicePipe implements PipeTransform {
  transform(array: any[], start: number, end: number): any[] {
    if (!array || !Array.isArray(array)) {
      return [];
    }

    return array.slice(start, end);
  }
}