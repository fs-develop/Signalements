import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { ReportingService } from 'src/app/services/reporting.service';
import { ApiService } from 'src/app/services/api.service';
import { MessagingService } from 'src/app/services/messaging.service';

import { TabOptions } from 'src/app/enums/tab-options';
import { Sex } from 'src/app/enums/sex';
import { NotifyTypes } from 'src/app/enums/notify-types';

import { Observation } from 'src/app/entities/observation';
import { Reporting, Signalement } from 'src/app/entities/signalement';

import { EditReport } from 'src/app/interfaces/edit-report';
import { Tools } from 'src/app/helpers/tools';

import { MAX_LEN_DESCRIPTION, MAX_LEN_USER_DATA, REGEX_EMAIL, STRING_EMPTY, UNASSIGNED } from 'src/app/app.constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form-report',
  templateUrl: './form-report.component.html',
  styleUrls: ['./form-report.component.scss']
})
export class FormReportComponent implements OnInit {

  @ViewChild('formDirective') private formDirective: NgForm | undefined;

  @Input("editReport") public editReport: EditReport | undefined;
  @Output("changeTab") public changeTab: EventEmitter<TabOptions> = new EventEmitter<TabOptions>();

  public minDate: Date;
  public maxDate: Date;
  public sexValues: Array<string> = Object.values(Sex);

  private itemIdToEdit: number = UNASSIGNED;
  public formReport: FormGroup = new FormGroup({});
  public isInEditMode: boolean = false;

  private callApiService: Subscription | null = null;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private reportingService: ReportingService,
    private messagingService: MessagingService) {

    let today: Date = new Date();
    this.minDate = new Date(today.getFullYear() - 100, 0, 1);
    this.maxDate = today;
  }

  ngOnInit(): void {

    this.formReport = this.formBuilder.group({
      firstNameCtrl: new FormControl(null, Validators.maxLength(MAX_LEN_USER_DATA)),
      lastNameCtrl: new FormControl(null, Validators.maxLength(MAX_LEN_USER_DATA)),
      emailCtrl: new FormControl(null, [Validators.required, Validators.pattern(REGEX_EMAIL)]),
      birthDateCtrl: new FormControl(null, Tools.isValidBirthDate),
      sexCtrl: new FormControl(null),
      descriptionCtrl: new FormControl(null, Validators.required),
      selectedObservations: new FormControl(null)
    });

  }

  ngOnChanges(changes: SimpleChanges) {

    if (this.editReport?.tabOption == TabOptions.Form) {

      this.itemIdToEdit = this.editReport?.itemIdToEdit;
      this.reportingService.getObservations((() => {

        this.formReport.reset();
        this.formDirective?.resetForm();
        this.isInEditMode = (this.itemIdToEdit != UNASSIGNED);

        if (this.itemIdToEdit != UNASSIGNED) {

          // Get reporting to Edit by Id
          let report: Signalement | undefined = this.reportingService.getReportingById(this.itemIdToEdit);
          if (report) {

            // Observation items in Reporting
            let observationsInReporting: Array<Observation> = new Array<Observation>();

            // Get Observations ID in Reporting
            let aObservationsId: Array<number> | undefined = report?.observations?.map(o => o.id);

            if (aObservationsId && aObservationsId.length > 0) {

              aObservationsId.forEach(observationId => {

                let observation: Observation | undefined = this.observationsList.find(o => o.id == observationId);
                if (observation) {
                  observationsInReporting.push(observation);
                }
              });
            }

            this.formReport.patchValue({
              firstNameCtrl: report?.author.first_name,
              lastNameCtrl: report?.author.last_name,
              emailCtrl: report?.author.email,
              birthDateCtrl: report?.author.birth_date,
              sexCtrl: report?.author.sex,
              descriptionCtrl: report?.description,
              selectedObservations: observationsInReporting
            });

          }
        }

      }));

    }
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  get loadingInProgress(): boolean {
    return this.reportingService.loadingObservationsInProgress;
  }

  get observationsList(): Array<Observation> {
    return this.reportingService.observationsList;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  get firstNameCtrl(): AbstractControl | null {
    return this.formReport.get("firstNameCtrl");
  }

  get lastNameCtrl(): AbstractControl | null {
    return this.formReport.get("lastNameCtrl");
  }

  get emailCtrl(): AbstractControl | null {
    return this.formReport.get("emailCtrl");
  }

  get birthDateCtrl(): AbstractControl | null {
    return this.formReport.get("birthDateCtrl");
  }

  get sexCtrl(): AbstractControl | null {
    return this.formReport.get("sexCtrl");
  }

  get descriptionCtrl(): AbstractControl | null {
    return this.formReport.get("descriptionCtrl");
  }

  get observationsCtrl(): AbstractControl | null {
    return this.formReport.get("selectedObservations");
  }

  get maxLenUserData(): number {
    return MAX_LEN_USER_DATA;
  }

  get maxLenDescription(): number {
    return MAX_LEN_DESCRIPTION;
  }

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  public onSubmit() {

    if (this.formReport.invalid) {
      return;
    }

    let reporting: Reporting = {
      id: this.itemIdToEdit,
      author: {
        first_name: this.firstNameCtrl?.value,
        last_name: this.lastNameCtrl?.value,
        email: this.emailCtrl?.value,
        sex: this.sexCtrl?.value,
        birth_date: Tools.Convert_Into_String_Date_YYYYMMDD(this.birthDateCtrl) || STRING_EMPTY
      },
      description: this.descriptionCtrl?.value,
      observations: (this.observationsCtrl?.value as Array<Observation>)?.map(o => o.id)
    }

    this.callApiService = this.api.saveReporting(reporting, this.isInEditMode)
      .subscribe({
        next: (oReporting: Reporting) => {
          // console.log('Reporting added or updated added:', oReporting);
        },
        error: (error: string) => {
          // console.error('Error adding or updating reporting:', error);

          this.callApiService?.unsubscribe();
          this.messagingService.notifyMessage(error, NotifyTypes.Error);
        },
        complete: () => {

          this.callApiService?.unsubscribe();

          if (this.isInEditMode) {
            this.changeTab.emit(TabOptions.List);
            this.messagingService.notifyMessage("Signalement mis à jour avec succès", NotifyTypes.Confirmation);
          }
          else {
            this.messagingService.notifyMessage("Signalement ajouté avec succès", NotifyTypes.Confirmation);
          }

          this.isInEditMode = false;

          this.formDirective?.resetForm();
          this.formReport.reset();
        }
      });

  }
}


