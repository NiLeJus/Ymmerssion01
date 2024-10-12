import { Timestamp } from 'rxjs';
import { Component, Input, computed } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message-bubble.component.html',
  styleUrl: './message-bubble.component.scss'
})

export class MessageBubbleComponent {

  @Input({required: true}) _message!: any;
actual_user_id = '1'

  _date = computed(() => {
    const timestamp = this._message.timestamp;
    const messageDate = new Date(timestamp);
    const now = new Date();
    const isToday = now.toDateString() === messageDate.toDateString();

    if (isToday) {
      // Si c'est aujourd'hui, on affiche uniquement l'heure (HH:MM)
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      // Si c'est un autre jour, on affiche HH:MM DD/MM/YY
      return messageDate.toLocaleDateString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    }
  });


  isReceived(): boolean{

    if ( this.actual_user_id === this._message.user_id ) { return true}
    else { return false }
  }

}
