import { FormsModule } from '@angular/forms';
import { TMessage, TMessageWPic } from '../../../_models/conversation.model';
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

  messageToSend!: TMessage; // Message texte à envoyer
  selectedFile: File | null = null; // Fichier image sélectionné

  ngOnChanges(changes: SimpleChanges) {
    if (changes['_user'] && this._userSignal()) {
      const user = this._userSignal();
      if (user) {
        this.messageToSend = {
          seen_by: [user.user_id],
          text: '',
          timestamp: '',
          user_id: user.user_id
        };
      }
    }
  }

  // Méthode pour gérer la sélection d'un fichier
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  sendMessage() {
    // Vérifier si le message texte ou le fichier est vide
    if (!this.messageToSend.text.trim() && !this.selectedFile) {
      console.warn('Le message ou l\'image est vide et ne peut pas être envoyé.');
      return;
    }

    // Générer le timestamp lors de l'envoi du message
    this.messageToSend.timestamp = new Date().toISOString();

    // Si un fichier est sélectionné, téléchargez l'image d'abord
    if (this.selectedFile) {
      this.firebaseService.uploadImage(this.selectedFile).then((imageUrl: string) => {
        // Préparer le message avec image
        const messageWithImage: TMessageWPic = {
          documentRef: imageUrl,
          seen_by: [this._userSignal()!.user_id],
          timestamp: this.messageToSend.timestamp,
          user_id: this._userSignal()!.user_id
        };

        // Envoyer d'abord le message avec image
        this.sendMessageToFirebase(messageWithImage);

        // Puis envoyer le message texte seulement si celui-ci n'est pas vide
        if (this.messageToSend.text.trim()) {
          const messageTextOnly: TMessage = {
            seen_by: [this._userSignal()!.user_id],
            text: this.messageToSend.text,
            timestamp: this.messageToSend.timestamp,
            user_id: this._userSignal()!.user_id
          };
          this.sendMessageToFirebase(messageTextOnly);
        }

      }).catch((error) => {
        console.error('Erreur lors du téléchargement de l\'image :', error);
      });
    } else {
      // Envoi d'un message texte uniquement
      this.sendMessageToFirebase(this.messageToSend);
    }
  }

  // Méthode générique pour envoyer un message à Firebase
  sendMessageToFirebase(message: TMessage | TMessageWPic) {
    this.firebaseService.sendMessage(this.conversationID, message).subscribe({
      next: () => {
        console.log('Message envoyé avec succès');
        this.resetMessage();
      },
      error: (error) => {
        console.error('Erreur lors de l\'envoi du message :', error);
      }
    });
  }

  resetMessage() {
    this.selectedFile = null; // Réinitialiser le fichier sélectionné
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
