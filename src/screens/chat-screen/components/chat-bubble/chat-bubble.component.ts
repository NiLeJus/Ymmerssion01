import { Component, Input, computed } from '@angular/core';
import { TMessage } from '../../../../_models/conversation.model';
import { UserService } from '../../../../services/user.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-chat-bubble',
  standalone: true,
  imports: [NgClass],
  templateUrl: './chat-bubble.component.html',
  styleUrl: './chat-bubble.component.scss'
})

export class ChatBubbleComponent {
 @Input({required: true}) message!: TMessage;

 constructor( public userService: UserService) {}

actualUser = computed(() => {
  return this.userService.getThisUserId()
})

isReceived(): boolean{ 

  if ( this.actualUser() === this.message.sender_id ) { return true}
  else { return false }
}

}