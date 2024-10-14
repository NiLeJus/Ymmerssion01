import { TUser } from './../../../_models/user.model';
import { Component, signal, computed, Input, OnInit } from '@angular/core';
import { MessageBubbleComponent } from './components/message-bubble/message-bubble.component';
import { FormsModule } from '@angular/forms';
import { TConversation } from '../../../_models/conversation.model';
import { CreateRoomSectionComponent } from "../create-room-section/create-room-section.component";
import { NgClass} from '@angular/common';

@Component({
  selector: 'app-room-section',
  standalone: true,
  imports: [MessageBubbleComponent, NgClass, FormsModule, CreateRoomSectionComponent],
  templateUrl: './room-section.component.html',
  styleUrls: ['./room-section.component.scss'],
})
export class RoomSectionComponent {
  // Signal pour la conversation sélectionnée
  _selectedConversationSignal = signal<TConversation | null | undefined>(undefined);

  isCreatingARoom = false

  @Input({ required: true }) set _selectedConversation(value: TConversation | null) {
    this._selectedConversationSignal.set(value);
  }

  _userSignal = signal<any>(undefined);

  @Input({ required: true }) set _user(value: TUser) {
    this._userSignal.set(value);
  }

  _conversationTitle = computed(() => {
    const selectedConversation = this._selectedConversationSignal();
    return selectedConversation ? selectedConversation.title : 'Sélectionne une conv';
  });

  _isRoomSelected = computed(() => {
    const selectedConversation = this._selectedConversationSignal();
    return !selectedConversation;
  });

  _messages = computed(() => {
    const selectedConversation = this._selectedConversationSignal();
    return selectedConversation ? selectedConversation.messages : [];
  });

  dev() {
    console.log(this._selectedConversationSignal());
  }
}
