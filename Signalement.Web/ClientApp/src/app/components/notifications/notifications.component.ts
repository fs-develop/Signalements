import { Component, OnDestroy, OnInit } from '@angular/core';

import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarRef,
  MatSnackBarVerticalPosition,
  TextOnlySnackBar
} from '@angular/material/snack-bar';

import { NotifyTypes } from 'src/app/enums/notify-types';
import { notifications } from 'src/app/interfaces/notifications'
import { MessagingService } from 'src/app/services/messaging.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  template: ``,
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit, OnDestroy {

  private durationInSeconds = 3;
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  private snackBarAction: string = 'Close';

  private listenerMessages: Subscription | null = null;

  private queue: Array<notifications> | null = null;
  private idxQueue: number = 0;

  constructor(
    private messagingService: MessagingService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {

    // Subscribe to listen to system messages
    this.listenerMessages = this.messagingService.getMessage()
      .subscribe(sysMessage => {

        if (sysMessage.notifyMessage) {
          this.addToNotificationsQueue(sysMessage.notifyMessage, sysMessage.notifyType);
        }

      });
  }

  ngOnDestroy(): void {

    if (this.listenerMessages) {
      this.listenerMessages.unsubscribe();
    }

    this.listenerMessages = null;
  }

  // Notifications Queue
  private addToNotificationsQueue(messageToDisplay: string, notifyType: NotifyTypes) {

    let styleNotification: string = "snackbar-message-style";

    if (notifyType == NotifyTypes.Confirmation) {
      styleNotification = "snackbar-confirm-style";
    }
    else if (notifyType == NotifyTypes.Warning) {
      styleNotification = "snackbar-warning-style";
    }
    else if (notifyType == NotifyTypes.Error) {
      styleNotification = "snackbar-error-style";
    }

    let startDisplayMessages: boolean = false;
    let aMessages: Array<string> = messageToDisplay.split("|");
    aMessages.forEach(message => {

      if (this.queue == null) {
        this.queue = new Array<notifications>();
        this.idxQueue = 0;
        startDisplayMessages = true;
      }

      this.queue.push({
        messageToDisplay: message,
        styleNotification: styleNotification
      });

    });

    if (startDisplayMessages) {
      this.snackbarNotifications();
    }

  }

  // Display Queue Notifications items
  private snackbarNotifications() {

    if (this.queue && this.queue.length > 0 && this.idxQueue < this.queue.length) {

      let message: notifications = this.queue[this.idxQueue];

      let oSnackBar: MatSnackBarRef<TextOnlySnackBar> = this.snackBar.open(
        message.messageToDisplay,
        this.snackBarAction,
        {
          duration: this.durationInSeconds * 1000,
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
          panelClass: [message.styleNotification]
        });

      oSnackBar.onAction().subscribe(() => {
        oSnackBar.dismiss();
      });

      oSnackBar.onAction().subscribe(() => {
        // console.log('--- The snackbar action was triggered!');
      });

      oSnackBar.afterDismissed().subscribe(() => {
        // console.log('--- The snackbar was dismissed');

        this.idxQueue++;
        this.snackbarNotifications();
      });

    }
    else {
      this.queue = null;
      this.idxQueue = 0;
    }
  }
}
