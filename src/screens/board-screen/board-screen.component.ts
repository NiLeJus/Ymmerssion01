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
  _conversations: TConversation[] = [];
  _selectedConversation: TConversation | null = null; // Assurez-vous d'utiliser le type approprié
  isCreatingARoom = false;
  _selectedConversationID: string  = 'undefined'; // Utiliser un type plus spécifique

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
        const userInfo: TUser | null = await this.registerService.getUserName(
          user.uid
        );

        if (userInfo) {
          this.user = userInfo;
          console.log(`User logged in:`, this.user);

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
              this._conversations = conversations;
              console.log(this._user().user_id);
            });
        }
      }
    });
  }

  onSelectConversation(conversation: TConversation) {
    console.log('Received', conversation);
    this._selectedConversation = conversation;
    this._selectedConversationID = conversation.id;
  }

  dev() {
    console.log(this._selectedConversationID);
  }

  updateSelectedConversation(updatedConversation: TConversation) {
    if (this._selectedConversation && this._selectedConversation.id === updatedConversation.id) {
      this._selectedConversation = updatedConversation; // Met à jour la conversation sélectionnée si elle correspond
    }
  }
}
