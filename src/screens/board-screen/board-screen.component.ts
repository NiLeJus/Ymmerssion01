import { FirebaseService } from './../../services/fireBase.service';
import {
  Component,
  OnInit,
  inject,
  signal,
  WritableSignal,
} from '@angular/core';
import { InboxSectionComponent } from './inbox-section/inbox-section.component';
import { RoomSectionComponent } from './room-section/room-section.component';
import { InputSectionComponent } from './input-section/input-section.component';
import { HeaderComponent } from '../../shared-components/header/header.component';
import { CreateRoomSectionComponent } from './create-room-section/create-room-section.component';
import { Register } from '../../services/register.service';
import { Auth } from '@angular/fire/auth';
import { TUser } from '../../_models/user.model';
import { Router } from '@angular/router';
import { TConversation } from '../../_models/conversation.model'; // Assurez-vous que le type TConversation est bien importé.

@Component({
  selector: 'app-board-screen',
  standalone: true,
  imports: [
    HeaderComponent,
    InboxSectionComponent,
    RoomSectionComponent,
    InputSectionComponent,
    CreateRoomSectionComponent,
  ],
  templateUrl: './board-screen.component.html',
  styleUrls: ['./board-screen.component.scss'],
})
export class BoardScreenComponent implements OnInit {
  isLogging: boolean = false;
  user: TUser | null = null;
  _user: WritableSignal<TUser> = signal({
    name: '',
    username: '',
    user_id: '',
    mail: '',
    password: '',
    status: 'offline',
  });
  firebaseService = inject(FirebaseService);
  _conversations: any = [];
  _selectedConversation: any;
  isCreatingARoom = false;
  _selectedConversationID: any = undefined;
  constructor(
    public registerService: Register,
    private router: Router,
    private afAuth: Auth
  ) {}

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.isLogging = false;
        this.router.navigate(['/']);
      } else {
        this.isLogging = true;
        // Récupérer le profil complet (nom, email et username)
        const userInfo: TUser | null = await this.registerService.getUserName(
          user.uid
        ); // { name, email, username }

        if (userInfo) {
          this.user = userInfo; // Utilisation de TUser ici
          console.log(`User logged in:`, this.user);

          // Mettre à jour le signal _user avec l'objet TUser
          this._user.set({
            name: this.user.name || '',
            username: this.user.username || '',
            user_id: this.user.user_id,
            mail: this.user.mail || '',
            password: '',
            status: 'online',
          });

          // Récupérer les conversations de l'utilisateur
          this.firebaseService
            .getConversations(this._user().user_id)
            .subscribe((conversations: TConversation[]) => {
              this._conversations.push(...conversations); // Élargir l'array avec le contenu des conversations
              console.log(this._user().user_id);
              // Aplatir le tableau si nécessaire
              if (
                this._conversations.length > 0 &&
                Array.isArray(this._conversations[0])
              ) {
                this._conversations = this._conversations[0];
              }
            });
        }
      }
    });
  }

  onSelectConversation(conversation: TConversation) {
    console.log('Received', conversation);
    this._selectedConversation = conversation;
    this._selectedConversationID = this._selectedConversation.id; // Assurez-vous que `id` est une propriété valide de TConversation
  }

  dev() {
    console.log(this._selectedConversationID);
  }
}
