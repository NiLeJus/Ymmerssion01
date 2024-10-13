import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { TUser } from '../../../../../_models/user.model';
import { FirebaseService } from '../../../../../services/fireBase.service'; // Assurez-vous d'importer le service
import {
  TMessage,
  TMessageWPic,
} from '../../../../../_models/conversation.model';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
})
export class MessageBubbleComponent implements OnInit {
  @Input({ required: true }) _message!: any;

  _userSignal = signal<TUser | undefined>(undefined);
  username: string | null = null; // Propriété pour stocker le username

  @Input({ required: true }) set _user(value: any) {
    this._userSignal.set(value);
  }

  constructor(private firebaseService: FirebaseService) {} // Injecter le service Firebase

  documentUrl: string | null = null; // Propriété pour stocker l'URL de l'image

  ngOnInit(): void {
    console.log(this._userSignal());

    // Récupérer le username de l'utilisateur basé sur l'UID
    const userId = this._message.user_id;

    this.firebaseService
      .getUsernameByUid(userId)
      .then((username) => {
        this.username = username;
        console.log(`Username for user ID ${userId}: ${this.username}`);
      })
      .catch((error) => {
        console.error(`Error fetching username for user ID ${userId}:`, error);
      });

    // Vérifier si le message contient un documentRef et récupérer l'URL
    if ('documentRef' in this._message && this._message.documentRef) {
      this.firebaseService
        .getDocumentUrl(this._message.documentRef)
        .then((url) => {
          this.documentUrl = url;
          console.log(`Document URL: ${this.documentUrl}`);
        })
        .catch((error) => {
          console.error(
            `Error fetching document URL for ref ${this._message.documentRef}:`,
            error
          );
        });
    }
  }

  _date = computed(() => {
    const timestamp = this._message.timestamp;
    const messageDate = new Date(timestamp);
    const now = new Date();
    const isToday = now.toDateString() === messageDate.toDateString();

    if (isToday) {
      return messageDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });
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
