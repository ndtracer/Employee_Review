import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
  name: 'uniqueLocation',
  pure: false
})
export class UniqueLocationPipe implements PipeTransform {

  transform(employees: any[]) {
      return employees.filter(e => e.department==e.department);
      }
  }

  // @Pipe({
  //   name: 'filter'
  // })
  // export class FilterPipe implements PipeTransform{

  //   transform(value: any, filterString: string, propName: string): any {
  //       if (value.length === 0) {
  //         return value;
  //       }
  //       for (const item of value) {
  //         const resultArray = [];
  //         if (item[propName] === filterString) {
  //           resultArray.push(item);
  //         }
  //         return resultArray;
  //       }
  //   }
  // }
