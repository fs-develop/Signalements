import { Component, OnDestroy, OnInit } from '@angular/core';

import { ReportingService } from 'src/app/services/reporting.service';
import { MessagingService } from 'src/app/services/messaging.service';

import { TabOptions } from 'src/app/enums/tab-options';
import { EditReport } from 'src/app/interfaces/edit-report';

import { UNASSIGNED } from 'src/app/app.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-manage-reports',
  templateUrl: './manage-reports.component.html',
  styleUrls: ['./manage-reports.component.scss']
})
export class ManageReportsComponent implements OnInit, OnDestroy {

  public idxSelectedTab: number = 0;
  public itemIdToEdit: number = UNASSIGNED;
  public editReport: EditReport = { tabOption: TabOptions.List, itemIdToEdit: UNASSIGNED };

  private listenerMessages: Subscription | null = null;

  constructor(
    private messagingService: MessagingService,
    private reportingService: ReportingService) { }

  ngOnInit(): void {
    this.reportingService.onInit();

    // Subscribe to listen to system messages
    this.listenerMessages = this.messagingService.getMessage()
      .subscribe(sysMessage => {

        if (sysMessage.itemToEdit) {
          this.itemIdToEdit = sysMessage.itemToEdit;
          this.idxSelectedTab = TabOptions.Form;
        }

      });
  }

  ngOnDestroy(): void {

    if (this.listenerMessages) {
      this.listenerMessages.unsubscribe();
    }

    this.listenerMessages = null;
  }

  // Tab Change event
  public onTabChange(tabIndex: TabOptions): void {

    this.editReport = { tabOption: tabIndex, itemIdToEdit: this.itemIdToEdit };

    this.idxSelectedTab = tabIndex;
    this.itemIdToEdit = UNASSIGNED;
  }

  // Change Tab option by code
  public onChangeTab(tabToDisplay: TabOptions): void {

    this.idxSelectedTab = tabToDisplay;
  }
}
