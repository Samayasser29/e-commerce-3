import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(arrayObject: any[], word: string): any[] {
    if (!arrayObject || !word) return arrayObject;
    return arrayObject.filter(item =>
      item.title.toLowerCase().includes(word.toLowerCase())
    );
  }

}
