import { FormsModule } from '@angular/forms';
import { TMessage } from '../../../_models/conversation.model';
import { FirebaseService } from './../../../services/fireBase.service';
import { Component, inject, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';

@Component({
  selector: 'app-input-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-section.component.html',
  styleUrl: './input-section.component.scss'
})
export class InputSectionComponent implements OnChanges {


  @Input({required: true}) conversationID! : string

  firebaseService = inject(FirebaseService)
  enteredText = ''
  messageToSend: TMessage = {
    sender_id: '1',
    text: '',
    seen_by: ['1'],
    timeStamp: '01'
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.conversationID) {
      this.messageToSend.text = ''
    }
  }

  sendMessage() {
   console.log(this.conversationID)
    this.firebaseService.sendMessage(this.conversationID, this.messageToSend)
  }
}
