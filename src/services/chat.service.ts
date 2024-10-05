import { TConversation, TMessage, TConversations } from '../_models/conversation.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class ChatService {


  private _conversations: TConversations = [
    {
      id: '1',
      users_id: ['1', '2', '3'],
      title: 'Afficionados du poulet',
      timeStamp : '2024-10-05T14:45:00Z',
      messages: [
        {
          sender_id: '1',
          text: "Le poulet rôti, c'est la vie !",
          seenBy: ['1', '3', '2'],
          timeStamp : '2024-10-05T14:32:00Z',
        },
        {
          sender_id: '1',
          text: 'Je pourrais en manger tous les jours.',
          seenBy: [''],
          timeStamp : '2024-10-05T14:33:00Z',
        },
        {
          sender_id: '2',
          text: "Franchement, grillé c'est encore meilleur.",
          seenBy: [''],
          timeStamp : '2024-10-05T14:35:00Z',
        },
        {
          sender_id: '2',
          text: "Avec des frites maison, c'est le top.",
          seenBy: [''],
          timeStamp : '2024-10-05T14:36:00Z',
        },
        {
          sender_id: '2',
          text: 'Tu connais le poulet à la moutarde ?',
          seenBy: [''],
          timeStamp : '2024-10-05T14:37:00Z',
        },
        {
          sender_id: '1',
          text: "Oui, mais je préfère à l'ail et aux herbes.",
          seenBy: [''],
          timeStamp : '2024-10-05T14:38:00Z',
        },
        {
          sender_id: '1',
          text: "Le poulet, c'est la base de tout repas réussi.",
          seenBy: [''],
          timeStamp : '2024-10-05T14:40:00Z',
        },
        {
          sender_id: '3',
          text: 'Vous avez essayé le poulet tandoori ? Une tuerie !',
          seenBy: [''],
          timeStamp : '2024-10-05T14:45:00Z',
        },
      ]
    },
    {
      id: '2',
      users_id: ['1', '3'],
      title: 'Débat sur la cuisson des légumes',
      timeStamp : '2024-10-05T14:45:00Z',
      messages: [
        {
          sender_id: '1',
          text: "Les légumes vapeur, c'est meilleur pour la santé.",
          seenBy: ['1', '3'],
          timeStamp : '2024-10-05T14:32:00Z',
        },
        {
          sender_id: '1',
          text: 'Mais ça manque de saveur parfois.',
          seenBy: ['1'],
          timeStamp : '2024-10-05T14:33:00Z',
        },
        {
          sender_id: '3',
          text: "Grillés avec des épices, c'est imbattable.",
          seenBy: ['1'],
          timeStamp : '2024-10-05T14:35:00Z',
        },
        {
          sender_id: '3',
          text: 'Avec un filet d’huile d’olive, c’est parfait !',
          seenBy: ['1'],
          timeStamp : '2024-10-05T14:36:00Z',
        },
        {
          sender_id: '1',
          text: "Les aubergines grillées, ça te tente ?",
          seenBy: ['1'],
          timeStamp : '2024-10-05T14:37:00Z',
        },
        {
          sender_id: '1',
          text: "Avec un peu de fromage fondu dessus, ça devient délicieux.",
          seenBy: ['1'],
          timeStamp : '2024-10-05T14:38:00Z',
        },
        {
          sender_id: '1',
          text: "Tu as d'autres idées pour cuisiner les légumes ?",
          seenBy: ['1'],
          timeStamp : '2024-10-05T14:40:00Z',
        },
        {
          sender_id: '3',
          text: "Des poivrons grillés, farcis au fromage de chèvre, c'est à essayer !",
          seenBy: ['1'],
          timeStamp : '2024-10-05T14:45:00Z',
        },
      ]
    },
    {
      id: '3',
      users_id: ['1', '3'],
      title: 'Haters des Aubergines',
      timeStamp : '2024-10-05T14:45:00Z',

      messages: [
        {
          sender_id: '1',
          text: "Les aubergines, c'est franchement pas terrible.",
          seenBy: ['1', '3'],
          timeStamp : '2024-10-05T14:32:00Z',
        },
        {
          sender_id: '1',
          text: 'Je trouve ça trop fade.',
          seenBy: [''],
          timeStamp : '2024-10-05T14:33:00Z',
        },
        {
          sender_id: '3',
          text: "Et puis, la texture est étrange, non ?",
          seenBy: [''],
          timeStamp : '2024-10-05T14:35:00Z',
        },
        {
          sender_id: '3',
          text: "Même grillées, je ne suis pas fan.",
          seenBy: [''],
          timeStamp : '2024-10-05T14:36:00Z',
        },
        {
          sender_id: '1',
          text: "Je préfère largement les courgettes.",
          seenBy: [''],
          timeStamp : '2024-10-05T14:37:00Z',
        },
        {
          sender_id: '1',
          text: "Avec de l'ail et de l'huile d'olive, c'est imbattable.",
          seenBy: [''],
          timeStamp : '2024-10-05T14:38:00Z',
        },
        {
          sender_id: '1',
          text: "Les aubergines, c'est la seule exception dans les légumes pour moi.",
          seenBy: [''],
          timeStamp : '2024-10-05T14:40:00Z',
        },
        {
          sender_id: '3',
          text: "On est d'accord, je ne comprends pas l'engouement.",
          seenBy: [''],
          timeStamp : '2024-10-05T14:45:00Z',
        },
      ]
    }
];


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
}
