import { AbstractControl } from "@angular/forms";
import * as moment from 'moment';

export abstract class Tools {

  // Convert control date value to 'YYYY-MM-DD' format
  public static Convert_Into_String_Date_YYYYMMDD(control: AbstractControl | null): string | null {

    if (control === null || control.value === null || control.value === '') {
      return null;
    }

    try {

      return moment(control.value).format('YYYY-MM-DD');

    } catch (e) {
      console.error(e);
    }

    return null;
  }

  // Custom validator for the date of the 'Birthdate' control
  public static isValidBirthDate = (control: AbstractControl) => {

    if (control === null || control.value === null || control.value === '') {
      return null;
    }

    let maxDate: Date = new Date();
    let minDate = new Date(maxDate.getFullYear() - 100, 0, 1);

    let date: Date = new Date(Date.parse(control.value));
    return (minDate <= date) && (date <= maxDate) ? null : { noValidBirthDate: true };
  };

}
