import { Component, Input, OnInit, OnChanges, SimpleChanges, computed, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { TUser } from '../../../../../_models/user.model';
import { FirebaseService } from '../../../../../services/fireBase.service';

@Component({
  selector: 'app-message-bubble',
  standalone: true,
  imports: [NgClass],
  templateUrl: './message-bubble.component.html',
  styleUrls: ['./message-bubble.component.scss'],
})
export class MessageBubbleComponent implements OnInit, OnChanges {
  @Input({ required: true }) _message!: any;

  _userSignal = signal<TUser | undefined>(undefined);
  _usernameSignal = signal<string | null>(null); // Signal pour le username

  @Input({ required: true }) set _user(value: any) {
    this._userSignal.set(value);
  }

  documentUrl: string | null = null;

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
    this.fetchUsernameAndDocument(); // Fetch initial username and document
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['_message'] || changes['_user']) {
      this.fetchUsernameAndDocument(); // Fetch on message/user change
    }
  }

  async fetchUsernameAndDocument(): Promise<void> {
    // Réinitialiser les signaux à chaque nouveau message
    this._usernameSignal.set(null);
    this.documentUrl = null;

    const userId = this._message.user_id;

    // Récupérer le username en utilisant un signal
    try {
      const username = await this.firebaseService.getUsernameByUid(userId);
      this._usernameSignal.set(username); // Mettre à jour le signal
      console.log(`Username for user ID ${userId}: ${username}`);
    } catch (error) {
      console.error(`Error fetching username for user ID ${userId}:`, error);
    }

    // Si le message contient un documentRef, récupérer l'URL du document
    if ('documentRef' in this._message && this._message.documentRef) {
      try {
        const url = await this.firebaseService.getDocumentUrl(this._message.documentRef);
        this.documentUrl = url;
        console.log(`Document URL: ${this.documentUrl}`);
      } catch (error) {
        console.error(`Error fetching document URL for ref ${this._message.documentRef}:`, error);
      }
    }
  }

  _date = computed(() => {
    const timestamp = this._message.timestamp;
    if (!timestamp) return ''; // Retourne une chaîne vide si le timestamp n'est pas disponible

    const messageDate = new Date(timestamp);
    return messageDate.toLocaleString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC', // Utilisez UTC pour éviter les décalages
    });
  });

  isReceived(): boolean {
    const user = this._userSignal(); // Obtenir l'utilisateur actuel
    return !!(user && user.user_id === this._message.user_id); // Utilisation de '!!' pour forcer un booléen
  }
}
