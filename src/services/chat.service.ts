import { TConversation, TMessage, TConversations } from '../_models/conversation.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ChatService {


private _conversations: TConversations = [
    {
      id: '32',
      users_id: ['1', '2', '3'],
      title: 'Afficionados du poulet',
      messages: [
        {
          sender_id: '1',
          text: "Le poulet rôti, c'est la vie !",
          seenBy: ['1', '3', '2'],
        },
        {
          sender_id: '1',
          text: 'Je pourrais en manger tous les jours.',
          seenBy: [''],
        },
        {
          sender_id: '2',
          text: "Franchement, grillé c'est encore meilleur.",
          seenBy: [''],
        },
        {
          sender_id: '2',
          text: "Avec des frites maison, c'est le top.",
          seenBy: [''],
        },
        {
          sender_id: '2',
          text: 'Tu connais le poulet à la moutarde ?',
          seenBy: [''],
        },
        {
          sender_id: '1',
          text: "Oui, mais je préfère à l'ail et aux herbes.",
          seenBy: [''],
        },
        {
          sender_id: '1',
          text: "Le poulet, c'est la base de tout repas réussi.",
          seenBy: [''],
        },
        {
          sender_id: '3',
          text: 'Vous avez essayé le poulet tandoori ? Une tuerie !',
          seenBy: [''],
        },
      ]
    }
  ];

  getMessages() {
    return this._conversations[0].messages;
  }

  getConversations(user_id: string): any {
    return this._conversations
  }

  markMessagesAsRead(user_id: string, conv_id: string) {
      const conversation = this._conversations.find((conversation) => conversation.id === conv_id);
      
      if (conversation) {
          return conversation.messages.map((el) => el.seenBy.push(user_id));
      }
        return 
    }
  
  sendMessage(newMessage: TMessage) {
    this._conversations[0].messages.unshift({
      sender_id: newMessage.sender_id,
      text: newMessage.text,
      seenBy: newMessage.seenBy,
    });
  }
}
