import { TUser } from '../../../_models/user.model';
import {
  Component,
  signal,
  computed,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { RoomTabComponent } from './room-tab/room-tab.component';
import { TConversation } from '../../../_models/conversation.model';
import { NgClass } from '@angular/common';
import { CreateRoomSectionComponent } from '../create-room-section/create-room-section.component';

@Component({
  selector: 'app-inbox-section',
  standalone: true,
  imports: [RoomTabComponent, NgClass, CreateRoomSectionComponent, ],
  templateUrl: './inbox-section.component.html',
  styleUrl: './inbox-section.component.scss',
})
export class InboxSectionComponent {
  _userSignal = signal<TUser | undefined>(undefined);

  @Input({ required: true }) set _user(value: TUser) {
    this._userSignal.set(value);
  }

  @Input({ required: true }) _conversations!: any;

  isCreatinARoom = false;

  @Output() select = new EventEmitter();

  gobaleConversation: any = signal(undefined)

  selectedConversation: any = signal(undefined);

isGlobal(index : any) {
  if (index === '0') { return true }
  else {return false }
}

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
