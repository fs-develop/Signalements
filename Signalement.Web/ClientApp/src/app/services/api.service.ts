import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';

import { environment } from 'src/environments/environment';

import { Reporting, Signalement } from 'src/app/entities/signalement';
import { Observation } from 'src/app/entities/observation';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  // Get Reportings list
  public getReportings(): Observable<Array<Signalement>> {

    let apiToCall: string = `${environment.endpointAPI}api/reporting/GetReporting`;
    // console.log("ApiService :: GetReporting :: call:", apiToCall)

    return this.http.get<Array<Signalement>>(apiToCall)
      .pipe(catchError(this.errorHandler));
  }

  // Get Observations list
  public getObservations(): Observable<Array<Observation>> {

    let apiToCall: string = `${environment.endpointAPI}api/reporting/GetObservations`;
    // console.log("ApiService :: getObservations :: call:", apiToCall);

    return this.http.get<Array<Observation>>(apiToCall)
      .pipe(catchError(this.errorHandler));
  }

  // Add or Update Reporting
  public saveReporting(oReport: Reporting, isUpdate: boolean): Observable<Reporting> {

    if (!isUpdate) {

      let apiToCall: string = `${environment.endpointAPI}api/reporting/AddReporting`;
      // console.log("ApiService :: addReporting :: call:", apiToCall);

      return this.http.post<Reporting>(apiToCall, oReport)
        .pipe(catchError(this.errorHandler));
    }
    else {

      let apiToCall: string = `${environment.endpointAPI}api/reporting/UpdateReporting/${oReport.id}`;
      // console.log("ApiService :: UpdateReporting :: call:", apiToCall);

      return this.http.put<any>(apiToCall, oReport)
        .pipe(catchError(this.errorHandler));
    }
  }

  // Handle API errors
  private errorHandler(error: HttpErrorResponse) {

    let errorOccurred: string | null = null;

    if (error.error instanceof ErrorEvent) {

      // A client-side or network error occurred. Handle it accordingly.
      console.error('ApiService :: A client-side or network error occurred:', error.error.message);

      errorOccurred = error.error.message;
    }
    else {

      // The backend returned an unsuccessful response code.
      // The response body may contain error details.
      console.error(`ApiService :: Backend returned code ${error.status}, ` +
        `body was: « ${typeof error.error === "object" ? JSON.stringify(error.error) : error.error} »`, error);

      if (error.status != HttpStatusCode.InternalServerError) {
        if (typeof error.error === "object") {
          if (error.error["author"] && error.error["author"].email) {
            errorOccurred = (error.error["author"].email as Array<string>).join("|");
          }
        }
        else {
          errorOccurred = error.error;
        }
      }

    }

    // return : the error that occurred or a custom error message.
    return throwError(errorOccurred || "Something wrong happened, please try again later.");
  }
}
