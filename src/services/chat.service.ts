import {
  TConversation,
  TMessage,
  TConversations,
} from '../_models/conversation.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ChatService {
 
}

/*
  getMessages() {
    return this._conversations[0].messages;
  }

  getConversations(user_id: string): TConversations {
    return this._conversations
  }

  markMessagesAsSeen(user_id: string, conv_id: string) {
      const conversation = this._conversations.find((conversation) => conversation.id === conv_id);

      if (conversation) {
          return conversation.messages.map((el) => el.seenBy.push(user_id));
      }
        return
    }

  hasUnseenMessages(actualUser: string, conversation_id: string): boolean {
      const actualConversation = this._conversations.find((conversation) => conversation.id === conversation_id);

      if (!actualConversation) {
        throw new Error(`Conversation with id ${conversation_id} not found`);
      }

      return actualConversation.messages.some((message) => !message.seenBy.includes(actualUser));
    }

  sendMessage(newMessage: TMessage, actualUser: string) {
    this._conversations[0].messages.unshift({
      sender_id: newMessage.sender_id,
      text: newMessage.text,
      seenBy: newMessage.seenBy,
      timeStamp: newMessage.timeStamp
    });
  }
*/
