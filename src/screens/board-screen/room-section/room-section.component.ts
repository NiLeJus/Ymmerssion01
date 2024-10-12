import { Component, signal, computed, Input, OnInit } from '@angular/core';
import { MessageBubbleComponent } from './components/message-bubble/message-bubble.component';
import { FormsModule } from '@angular/forms';
import { TConversation } from '../../../_models/conversation.model';
import { CreateRoomSectionComponent } from "../create-room-section/create-room-section.component";

@Component({
  selector: 'app-room-section',
  standalone: true,
  imports: [MessageBubbleComponent, FormsModule, CreateRoomSectionComponent],
  templateUrl: './room-section.component.html',
  styleUrl: './room-section.component.scss',
})
export class RoomSectionComponent  {
  @Input({ required: true }) _selectedConversation!: TConversation;

  isCreatingARoom = false

  _conversationTitle = computed(() => {
   if (this._selectedConversation === undefined) { return "Selectionne une conv"}
    else { return this._selectedConversation.title}
  })


  user_id = '1'

  _messages = computed(() => {
    return this._selectedConversation.messages
  })

  messageToSend = '';

  dev() {
    console.log(this._selectedConversation)
  }
}
