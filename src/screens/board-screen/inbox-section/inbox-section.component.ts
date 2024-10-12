import { UserService } from '../../../services/user.service';
import {
  Component,
  signal,
  computed,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { RoomTabComponent } from './room-tab/room-tab.component';
import { TConversation } from '../../../_models/conversation.model';
import { NgClass } from '@angular/common';
import { CreateRoomSectionComponent } from '../create-room-section/create-room-section.component';

@Component({
  selector: 'app-inbox-section',
  standalone: true,
  imports: [RoomTabComponent, NgClass, CreateRoomSectionComponent],
  templateUrl: './inbox-section.component.html',
  styleUrl: './inbox-section.component.scss',
})
export class InboxSectionComponent {
  @Input({ required: true }) _conversations!: any;

  isCreatinARoom = false;

  @Output() select = new EventEmitter();


  selectedConversation: any = signal(undefined);

  createRoom() {
    this.isCreatinARoom = !this.isCreatinARoom;
  }

  conversationSelected(conversation: any) {
    this.selectedConversation.set(conversation);
  }

  onSelectRoom(conversation: any) {
    console.log('Selected', conversation);
    this.select.emit(conversation);
  }

  conversattionUnselected() {
    this.selectedConversation.set(undefined);
  }
}
