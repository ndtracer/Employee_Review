import { Pipe, PipeTransform } from "@angular/core";
import { Employee } from "../_models";



export type FilterByT = 'location' | 'department'
@Pipe({
  name: 'unique',
  pure: true
})
export class UniquePipe implements PipeTransform {




  transform(employees: Employee[], filterBy: FilterByT): Employee[]  {
    const uniqueVals = []
    const filteredEmployees = employees.filter(employee => { if (!uniqueVals.includes(employee[filterBy])) {
      uniqueVals.push(employee[filterBy])
      return employee
    }

    })
  return filteredEmployees

  }
}

