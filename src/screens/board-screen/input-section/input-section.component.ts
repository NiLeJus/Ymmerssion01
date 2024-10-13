import { FormsModule } from '@angular/forms';
import { TMessage } from '../../../_models/conversation.model';
import { FirebaseService } from './../../../services/fireBase.service';
import { Component, inject, Input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { TUser } from '../../../_models/user.model';

@Component({
  selector: 'app-input-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './input-section.component.html',
  styleUrls: ['./input-section.component.scss']
})
export class InputSectionComponent implements OnChanges {

  @Input({ required: true }) conversationID!: string;

  _userSignal = signal<TUser | undefined>(undefined);
  @Input({ required: true }) set _user(value: TUser) {
    this._userSignal.set(value);
  }

  firebaseService = inject(FirebaseService);

  messageToSend!: TMessage; // Initialisation différée

  ngOnChanges(changes: SimpleChanges) {
    if (changes['_user'] && this._userSignal()) {
      const user = this._userSignal();

      // Vérifiez si l'utilisateur n'est pas undefined avant d'accéder à ses propriétés
      if (user) {
        this.messageToSend = {
          seen_by: [user.user_id], // ID de l'utilisateur actuel
          text: '',
          timestamp: '', // Timestamp généré lors de l'envoi
          user_id: user.user_id // Assurez-vous que user_id est défini
        };
      }
    }
  }

  sendMessage() {
    // Vérifiez si le texte du message est vide
    if (!this.messageToSend.text.trim()) {
      console.warn('Le message est vide et ne peut pas être envoyé.');
      return; // Sortir si le message est vide
    }

    // Générer le timestamp au moment de l'envoi
    this.messageToSend.timestamp = new Date().toISOString(); // Format ISO 8601

    console.log('Conversation ID:', this.conversationID);
    console.log('Message à envoyer:', this.messageToSend);

    // Appeler le service Firebase pour envoyer le message
    this.firebaseService.sendMessage(this.conversationID, this.messageToSend).subscribe({
      next: () => {
        console.log('Message envoyé avec succès');
        this.resetMessage(); // Réinitialiser l'objet message
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi du message:', error);
      }
    });
  }

  resetMessage() {
    // Réinitialiser messageToSend
    if (this._userSignal()) {
      const user = this._userSignal();
      this.messageToSend = {
        seen_by: [user!.user_id],
        text: '',
        timestamp: '',
        user_id: user!.user_id
      };
    }
  }
}
