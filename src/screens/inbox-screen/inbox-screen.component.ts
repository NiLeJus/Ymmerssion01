import { UserService } from './../../services/user.service';
import { Component, signal, computed } from '@angular/core';
import { ChatService } from '../../services/chat.service'
import { ConversationTabComponent } from './conversation-tab/conversation-tab.component';
import { TConversation } from '../../_models/conversation.model';
import { ChatScreenComponent } from '../chat-screen/chat-screen.component';

@Component({
  selector: 'app-inbox-screen',
  standalone: true,
  imports: [ConversationTabComponent, ChatScreenComponent],
  templateUrl: './inbox-screen.component.html',
  styleUrl: './inbox-screen.component.scss'
})
export class InboxScreenComponent {

  constructor( public chatService: ChatService, public userService: UserService) {}

  selectedConversation: any = signal(undefined)


  actualUser = computed(() => {
    return this.userService.getThisUserId()
  })

  conversations = computed(() => {
    return this.chatService.getConversations(this.actualUser())
    })

  hasUnseen(conversation_id: string) {
    return this.chatService.hasUnseenMessages(this.actualUser(), conversation_id)
  }

  conversationSelected(conversation: any) {
    this.selectedConversation.set(conversation)
    console.log('Selected', this.selectedConversation())
  }

  conversattionUnselected() {
    this.selectedConversation.set(undefined)
  }

}
