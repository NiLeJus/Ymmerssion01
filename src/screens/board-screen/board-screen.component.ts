import { FirebaseService } from './../../services/fireBase.service';
import { Component, computed, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { InboxSectionComponent } from './inbox-section/inbox-section.component';
import { RoomSectionComponent } from './room-section/room-section.component';
import { InputSectionComponent } from './input-section/input-section.component';
import { HeaderComponent } from "../../shared-components/header/header.component";
import { CreateRoomSectionComponent } from "./create-room-section/create-room-section.component";
import { Register } from '../../services/register.service';
import { Auth } from '@angular/fire/auth';
import { TUser } from '../../_models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-screen',
  standalone: true,
  imports: [HeaderComponent, InboxSectionComponent, RoomSectionComponent, InputSectionComponent, CreateRoomSectionComponent],
  templateUrl: './board-screen.component.html',
  styleUrls: ['./board-screen.component.scss']
})
export class BoardScreenComponent implements OnInit {

  constructor(
    public registerService: Register,
    private router: Router,
    private afAuth: Auth
  ) {}

  isLogging: boolean = false;
  user: { name: string | null; email: string | null } | null = null;
  _user: WritableSignal<TUser> = signal({
    name: '',
    user_id: '',
    mail: '',
    password: '',
    status: 'offline',
  });

  firebaseService = inject(FirebaseService);
  _conversations: any = [];
  _selectedConversation: any
  isCreatingARoom = false
  // Calcul de l'ID de la conversation sélectionnée
  _selectedConversationID: any = undefined;

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.isLogging = false;
        this.router.navigate(['/']);
      } else {
        this.isLogging = true;
        // Récupérer le profil complet (nom et email)
        const userInfo = await this.registerService.getUserName(user.uid); // { name, email }
        if (userInfo) {
          this.user = userInfo;
          console.log(`User logged in:`, this.user);

          // Mettre à jour le signal _user avec l'objet TUser
          this._user.set({
            name: this.user.name || '',
            user_id: user.uid,
            mail: this.user.email || '',
            password: '',
            status: 'online',
          });

          this.firebaseService.getConversations(this._user().user_id).subscribe((conversation) => {
            this._conversations.push(conversation);
            console.log(this._user().user_id);
            // Si _conversations a été imbriqué
            if (this._conversations.length > 0 && Array.isArray(this._conversations[0])) {
              this._conversations = this._conversations[0];
            }
          });
        }
      }
    });
  }


    /*
    this.firebaseService.getUsers().subscribe((user) => {
      console.log(user)
    })
      */

  onSelectConversation(conversation: any) {
    console.log("Received", conversation);
    this._selectedConversation = conversation;
    this._selectedConversationID = this._selectedConversation.id;
  }

  dev() {
    console.log(this._selectedConversationID);

  }
}
