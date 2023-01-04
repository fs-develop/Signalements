import { Component, Input, OnInit } from '@angular/core';
import { Signalement } from 'src/app/entities/signalement';

import { Sex } from 'src/app/enums/sex';
import { MessagingService } from 'src/app/services/messaging.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  @Input('reportToRender') public report: Signalement | null = null;

  public Sex: typeof Sex = Sex;

  constructor(private messagingService: MessagingService) { }

  ngOnInit(): void {
  }

  public onEdit(id: number): void {
    this.messagingService.itemToEdit(id);
  }
}
