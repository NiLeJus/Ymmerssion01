import { FormsModule } from '@angular/forms';
import { TMessage } from '../../../_models/conversation.model';
import { FirebaseService } from './../../../services/fireBase.service';
import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
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

  @Input({ required: true }) set _user(value: TUser) {
    this._selectedConversationSignal.set(value);
  }

  firebaseService = inject(FirebaseService);
  enteredText = '';

  // Initialisation de l'objet message
  messageToSend: TMessage = {
    seen_by: ['1'], // ID de l'utilisateur actuel
    text: '',
    timestamp: '', // Timestamp généré lors de l'envoi
    sender_id: conversationID // ID de l'utilisateur actuel
  };



  ngOnChanges(changes: SimpleChanges) {
    if (this.conversationID) {
      this.messageToSend.text = ''; // Réinitialise le texte du message
    }
  }

  sendMessage() {
    // Générer le timestamp au moment de l'envoi
    this.messageToSend.timestamp = new Date().toISOString(); // Format ISO 8601

    console.log('Conversation ID:', this.conversationID);
    console.log('Message à envoyer:', this.messageToSend);

    // Appeler le service Firebase pour envoyer le message
    this.firebaseService.sendMessage(this.conversationID, this.messageToSend).subscribe({
      next: () => {
        console.log('Message envoyé avec succès');
        this.enteredText = ''; // Réinitialise le champ de texte après l'envoi
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi du message:', error);
      }
    });
  }
}
