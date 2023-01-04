import { Injectable } from '@angular/core';

import { MessagingService } from 'src/app/services/messaging.service'
import { ApiService } from 'src/app/services/api.service';

import { Signalement } from 'src/app/entities/signalement';
import { Observation } from 'src/app/entities/observation';
import { NotifyTypes } from 'src/app/enums/notify-types';

import { UNASSIGNED } from 'src/app/app.constants';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  public reportingList: Array<Signalement> = Array<Signalement>();
  public observationsList: Array<Observation> = Array<Observation>();

  public loadingReportingInProgress: boolean = false;
  public loadingObservationsInProgress: boolean = false;

  private callApiReporting: Subscription | null = null;
  private callApiObservation: Subscription | null = null;

  constructor(
    private api: ApiService,
    private messagingService: MessagingService) { }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  public onInit(): void {

    this.reportingList = new Array<Signalement>();
    this.observationsList = new Array<Observation>();
  }

  public onDestroy(): void {

    this.reportingList = new Array<Signalement>();
    this.observationsList = new Array<Observation>();
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  // Get the reporting by Id
  public getReportingById(id: number): Signalement | undefined {

    if (this.reportingListLength > 0) {
      return this.reportingList.find(r => r.id == id);
    }

    return undefined;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  get reportingListLength(): number {
    return this.reportingList ? this.reportingList.length : UNASSIGNED;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  public getReportings(): void {

    this.loadingReportingInProgress = true;

    this.callApiReporting = this.api.getReportings()
      .subscribe(
        (data: Array<Signalement>) => {
          this.reportingList = data;
        },
        (httpError: string) => {
          // console.log(`ReportingService :: getReportings :: Error:`, httpError);

          this.loadingReportingInProgress = false;
          this.callApiReporting?.unsubscribe();

          this.messagingService.notifyMessage(httpError, NotifyTypes.Error);
        },
        () => {
          // console.log(`ReportingService :: getReportings :: Reporting list`, this.reportingList);

          this.loadingReportingInProgress = false;
          this.callApiReporting?.unsubscribe();
        });
  }

  public getObservations(actionToExecute: any): void {

    this.loadingObservationsInProgress = true;

    this.callApiObservation = this.api.getObservations()
      .subscribe(
        (data: Array<Observation>) => {
          this.observationsList = data;
        },
        (httpError: string) => {
          // console.log(`ReportingService :: getObservations :: Error:`, httpError);

          this.loadingObservationsInProgress = false;
          this.callApiObservation?.unsubscribe();

          this.messagingService.notifyMessage(httpError, NotifyTypes.Error);
        },
        () => {
          // console.log(`ReportingService :: getObservations :: Observations list`, this.observationsList);

          this.loadingObservationsInProgress = false;
          this.callApiObservation?.unsubscribe();

          if (actionToExecute) {
            actionToExecute();
          }
        });
  }

}
