import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { TUser } from '../../../../../_models/user.model';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'] // Correction de styleUrl en styleUrls
})
export class MessageBubbleComponent implements OnInit {

  @Input({ required: true }) _message!: any;

  _userSignal = signal<TUser | undefined>(undefined);

  @Input({ required: true }) set _user(value: any) {
    this._userSignal.set(value);
  }

  ngOnInit(): void {
    console.log(this._userSignal());
  }

  _date = computed(() => {
    const timestamp = this._message.timestamp;
    const messageDate = new Date(timestamp);
    const now = new Date();
    const isToday = now.toDateString() === messageDate.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return messageDate.toLocaleDateString('fr-FR', {
        hour: '2-digit',
        minute: '2-digit',
        day: '2-digit',
        month: '2-digit',
        year: '2-digit',
      });
    }
  });

  isReceived(): any {
    const user = this._userSignal(); // Obtenez l'utilisateur actuel
    return user && user.user_id === this._message.user_id; // Vérifiez si l'utilisateur existe et comparez les IDs
  }

}
