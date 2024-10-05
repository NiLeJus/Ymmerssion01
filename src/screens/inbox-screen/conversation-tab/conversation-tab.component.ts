import { Component, computed, Input, signal } from '@angular/core';
import { TConversation } from '../../../_models/conversation.model';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-conversation-tab',
  standalone: true,
  imports: [NgClass],
  templateUrl: './conversation-tab.component.html',
  styleUrl: './conversation-tab.component.scss'
})
export class ConversationTabComponent {

@Input({required: true}) conversation! : TConversation
@Input({required: true}) actualUser! : string
@Input({required: true}) hasUnseen! : boolean

membersCount = computed(() => { return this.conversation.users_id.length})}
