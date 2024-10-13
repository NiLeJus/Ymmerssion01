import { Injectable, inject } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TConversation, TMessage } from '../_models/conversation.model';
import { update } from 'firebase/database';
import { TUser } from '../_models/user.model';
import { addDoc } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  firestore = inject(Firestore);
  conversationCollection = collection(this.firestore, '_conversations');
  userCollection = collection(this.firestore, '_users')
  actualUser = '1'; // L'utilisateur actuel

  getConversations(): Observable<TConversation[]> {

    // Récupérer les données de la collection
    const conversations = collectionData(this.conversationCollection, { idField: 'id' }) as Observable<TConversation[]>;

    // Appliquer le filtre via pipe
    const filteredConversations = conversations.pipe(
      map((conversations: TConversation[]) =>
        conversations.filter((conversation: TConversation) =>
          conversation.users_id.includes(this.actualUser)

      // Ne retourne que les conversations où il y a le user
        )
      )
    );

    // Retourner l'observable filtré
    return filteredConversations;
  }


  createConversation(conversationToCreate: TConversation) {
    conversationToCreate.timestamp = new Date().toISOString(); // Ajouter un timestamp
    return from(addDoc(this.conversationCollection, conversationToCreate));
  }

  getThisUser(): any {
    return {
      user_id: 1,
      userName: 2,
    };
  }

  getUsernameById(id: string) {
    if (id === '1') {
      return 'Bernard';
    }
    if (id === '2') {
      return 'MarieJose';
    } else {
      return 'X33SLAY';
    }
  }

  sendMessage(conversationID: string, message: TMessage):any {
    console.log("Sending Message", message)
    console.log("At conversation", conversationID)
  }


  getUsers(): Observable<any>{
    console.log('GetUserHit')
    return collectionData(this.userCollection, {
      idField: 'id'
    }) as Observable<any>
  }
  }
