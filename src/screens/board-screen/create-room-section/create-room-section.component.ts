import { Component, inject, Input, signal } from '@angular/core';
import { FirebaseService } from '../../../services/fireBase.service';
import { FormsModule } from '@angular/forms';
import { TConversation } from '../../../_models/conversation.model';
import { TUser } from '../../../_models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-room-section',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-room-section.component.html',
  styleUrls: ['./create-room-section.component.scss']
})
export class CreateRoomSectionComponent {
  firebaseService = inject(FirebaseService);

  // Signal pour stocker l'utilisateur
  _userSignal = signal<TUser | undefined>(undefined);
  users : { id: string; username: string }[] = []; // Liste des utilisateurs
  _usersSignal = signal(this.users)
  emptyConversation!: TConversation; // Conversation à créer

  // Setter pour l'utilisateur, qui initialise la conversation vide
  @Input({ required: true }) set _user(value: TUser) {
    this._userSignal.set(value);
    this.initializeEmptyConversation(); // Initialisation de la conversation vide
  }
  constructor(private router: Router) {}
  // Initialiser la conversation vide
  private initializeEmptyConversation() {
    const userId = this._userSignal()?.user_id; // Récupère l'ID de l'utilisateur

    this.emptyConversation = {
      id: '',
      messages: [],
      title: '',
      users_id: userId ? [userId] : [] // Si l'utilisateur est présent, l'ajouter à la conversation
    };
  }

  ngOnInit(): void {
    // Récupérer la liste des utilisateurs
    this.firebaseService.getUsersList().subscribe((users) => {
      this.users = users; // Met à jour la liste des utilisateurs
      this._usersSignal.set(this.users);
    });
  }

  // Méthode pour créer la conversation
  createRoom(): any {
    
    if (!this.emptyConversation.users_id.length) {
      console.error('Aucun utilisateur dans la conversation.'); // Validation
      return; // Sortir si aucun utilisateur n'est présent
    }

    // Appel au service pour créer la conversation
    this.firebaseService.createConversation(this.emptyConversation).subscribe({
      next: (response) => {
        console.log('Conversation créée avec succès, ID:', response); // Succès

      },
      error: (error) => {
        console.error('Erreur lors de la création de la conversation:', error); // Gestion d'erreur
      }
    });

  }
}
