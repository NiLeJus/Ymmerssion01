import { Injectable, inject } from '@angular/core';
import { Firestore, arrayUnion, collection, collectionData, doc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TConversation, TMessage } from '../_models/conversation.model';
import { update } from 'firebase/database';
import { TUser } from '../_models/user.model';
import { addDoc } from 'firebase/firestore';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  firestore = inject(Firestore);
  globalRoomCollection = collection(this.firestore, '_global_room')
  conversationCollection = collection(this.firestore, '_conversations');
  userCollection = collection(this.firestore, '_users')
  actualUser = '1'; // L'utilisateur actuel

  getConversations(userID: string): Observable<TConversation[]> {

    // Récupérer les données de la collection
    const conversations = collectionData(this.conversationCollection, { idField: 'id' }) as Observable<TConversation[]>;
    console.log(userID)
    // Appliquer le filtre via pipe
    const filteredConversations = conversations.pipe(
      map((conversations: TConversation[]) =>
        conversations.filter((conversation: TConversation) =>
          conversation.users_id.includes(userID)

      // Ne retourne que les conversations où il y a le user
        )
      )
    );

    // Retourner l'observable filtré
    return filteredConversations;
  }

  sendMessage(conversationID: string, messageToSend: TMessage): Observable<void> {
    console.log("Sending Message", messageToSend)
    console.log("At conversation", conversationID)
    const docRef = doc(this.firestore, '_conversations/' + conversationID)
    const promise = updateDoc(docRef, {
      messages: arrayUnion(messageToSend) // Ajoute le message sans remplacer tout le document
    });
    return from(promise)
  }


  createConversation(conversationToCreate: TConversation) {
    conversationToCreate.timestamp = new Date().toISOString(); // Ajouter un timestamp
    return from(addDoc(this.conversationCollection, conversationToCreate));
  }


  }
