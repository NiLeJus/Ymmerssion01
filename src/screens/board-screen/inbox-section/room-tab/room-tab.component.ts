import { set } from '@angular/fire/database';
import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { TConversation } from '../../../../_models/conversation.model';
import { NgClass } from '@angular/common';
import { sign } from 'crypto';

@Component({
  selector: 'app-room-tab',
  standalone: true,
  imports: [NgClass],
  templateUrl: './room-tab.component.html',
  styleUrl: './room-tab.component.scss',
})
export class RoomTabComponent implements OnInit {
  @Input({ required: true }) conversation!: TConversation;
  @Input({ required: true }) _isGlobal!: any;

  actualUser = '1';
  hasUnseen: any = signal('');
  isGlobal: any = signal('');

  ngOnInit(): void {
    this.hasUnseen.set(
      this.conversation.messages.some(
        (message) =>
          Array.isArray(message.seen_by) &&
          message.seen_by.includes(this.actualUser)
      )
    );

    this.isGlobal.set(this._isGlobal);
    console.log(this.hasUnseen());
  }

  membersCount = computed(() => {
    return this.conversation.users_id.length;
  });

  dev() {
    console.log(this.conversation);
  }
}
