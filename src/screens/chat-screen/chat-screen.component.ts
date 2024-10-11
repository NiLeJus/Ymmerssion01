import { Component, signal, computed, Input } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { UserService } from '../../services/user.service';
import { TConversation } from '../../_models/conversation.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chat-screen',
  standalone: true,
  imports: [ChatBubbleComponent, FormsModule],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.scss',
})
export class ChatScreenComponent {
  @Input({ required: true }) selectedConversation!: TConversation;

  messageToSend = '';

  constructor(
    public chatService: ChatService,
    public userService: UserService
  ) {}

  messages = computed(() => {
    return this.chatService.getMessages();
  });

  actualUser = computed(() => {
    return this.userService.getThisUserId();
  });


  dev() {
    console.log(this.messageToSend)
  }
}
