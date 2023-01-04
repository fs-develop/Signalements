import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import { Signalement } from 'src/app/entities/signalement';
import { ReportingService } from 'src/app/services/reporting.service';

import { UNASSIGNED } from 'src/app/app.constants';

@Component({
  selector: 'app-reports-list',
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent implements OnInit {

  @Input("idxSelectedTab") public idxSelectedTab: number = UNASSIGNED;

  constructor(private reportingService: ReportingService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.idxSelectedTab == 0) {
      this.reportingService.getReportings();
    }

  }

  get loadingInProgress(): boolean {
    return this.reportingService.loadingReportingInProgress;
  }

  get reportingListLength(): number {
    return this.reportingService.reportingListLength;
  }

  get reportingList(): Array<Signalement> {
    return this.reportingService.reportingList;
  }
}
