import { Injectable } from '@angular/core';
import { NotifyTypes } from 'src/app/enums/notify-types';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {

  private subject: Subject<any> = new Subject<any>();

  constructor() {
  }

  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  itemToEdit (id: number) {
    this.subject.next({ itemToEdit: id });
  }

  notifyMessage(message: string, type: NotifyTypes) {
    this.subject.next({ notifyMessage: message, notifyType: type });
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
}
