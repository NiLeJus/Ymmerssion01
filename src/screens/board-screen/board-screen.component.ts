import { FirebaseService } from './../../services/fireBase.service';
import { Component, computed, OnInit, inject, signal, WritableSignal } from '@angular/core';
import { InboxSectionComponent } from './inbox-section/inbox-section.component';
import { RoomSectionComponent } from './room-section/room-section.component';
import { InputSectionComponent } from './input-section/input-section.component';
import { HeaderComponent } from "../../shared-components/header/header.component";
import { CreateRoomSectionComponent } from "./create-room-section/create-room-section.component";

@Component({
  selector: 'app-board-screen',
  standalone: true,
  imports: [HeaderComponent, InboxSectionComponent, RoomSectionComponent, InputSectionComponent, CreateRoomSectionComponent],
  templateUrl: './board-screen.component.html',
  styleUrls: ['./board-screen.component.scss']
})
export class BoardScreenComponent implements OnInit {
  firebaseService = inject(FirebaseService);

  _conversations: any = [];
  _selectedConversation: any

  isCreatingARoom = false
  // Calcul de l'ID de la conversation sélectionnée
  _selectedConversationID: any = undefined;

  ngOnInit(): void {
    this.firebaseService.getConversations().subscribe((conversation) => {
      this._conversations.push(conversation);

      // Si _conversations a été imbriqué
      if (this._conversations.length > 0 && Array.isArray(this._conversations[0])) {
        this._conversations = this._conversations[0];
      }
    });

    /*
    this.firebaseService.getUsers().subscribe((user) => {
      console.log(user)
    })
      */
  }

  onSelectConversation(conversation: any) {
    console.log("Received", conversation);
    this._selectedConversation = conversation;
    this._selectedConversationID = this._selectedConversation.id;
  }

  dev() {
    console.log(this._selectedConversationID);

  }
}
