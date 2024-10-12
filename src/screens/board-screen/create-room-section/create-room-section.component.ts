import { Component, inject } from '@angular/core';
import { FirebaseService } from '../../../services/fireBase.service';
import { FormsModule } from '@angular/forms';
import { TConversation } from '../../../_models/conversation.model';

@Component({
  selector: 'app-create-room-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-room-section.component.html',
  styleUrls: ['./create-room-section.component.scss']
})
export class CreateRoomSectionComponent {
  firebaseService = inject(FirebaseService);

  // Initialisation d'une conversation vide
  emptyConversation: TConversation = {
    id: '5',
    messages: [],
    timestamp: "", // Ce sera rempli par le service
    title: "",
    users_id: ['1']
  };

  createRoom(): any {
    this.firebaseService.createConversation(this.emptyConversation).subscribe({
      next: (response) => {
        console.log('Conversation créée avec succès, ID:', response);
      },
      error: (error) => {
        console.error('Erreur lors de la création de la conversation:', error);
      }
    });
  }
}
