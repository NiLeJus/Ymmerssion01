import { Component, signal, computed } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { ChatBubbleComponent } from './components/chat-bubble/chat-bubble.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat-screen',
  standalone: true,
  imports: [ChatBubbleComponent],
  templateUrl: './chat-screen.component.html',
  styleUrl: './chat-screen.component.scss'
})


export class ChatScreenComponent {



constructor( public chatService: ChatService, public userService: UserService) {}
messages = computed(() => {
return this.chatService.getMessages()
})

actualUser = computed(() => {
  return this.userService.getThisUserId()
})



};
