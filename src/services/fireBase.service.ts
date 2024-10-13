import { Injectable, inject } from '@angular/core';
import { Firestore, addDoc, arrayUnion, collection, collectionData, doc, setDoc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TConversation, TMessage } from '../_models/conversation.model';
import { TUser } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  firestore = inject(Firestore);
  globalRoomCollection = collection(this.firestore, '_global_room');
  conversationCollection = collection(this.firestore, '_conversations');
  userCollection = collection(this.firestore, '_users');

  getConversations(userID: string): Observable<TConversation[]> {
    const conversations = collectionData(this.conversationCollection, { idField: 'id' }) as Observable<TConversation[]>;
    console.log(userID);

    const filteredConversations = conversations.pipe(
      map((conversations: TConversation[]) =>
        conversations.filter((conversation: TConversation) =>
          conversation.users_id.includes(userID)
        )
      )
    );

    return filteredConversations;
  }

  sendMessage(conversationID: string, messageToSend: TMessage): Observable<void> {
    console.log("Sending Message", messageToSend);
    console.log("At conversation", conversationID);
    const docRef = doc(this.firestore, '_conversations', conversationID);

    const promise = updateDoc(docRef, {
      messages: arrayUnion(messageToSend)
    });

    return from(promise);
  }

  createConversation(conversationToCreate: TConversation) {
    conversationToCreate.timestamp = new Date().toISOString();
    return from(addDoc(this.conversationCollection, conversationToCreate));
  }

  // Nouvelle méthode pour obtenir le username par doc id
  getUsernameById(userId: string): Observable<string | null> {
    const userDocRef = doc(this.firestore, '_users', userId);

    return from(getDoc(userDocRef)).pipe(
      map((doc) => {
        if (doc.exists()) {
          const userData = doc.data() as TUser; // Assurez-vous que TUser contient le champ username
          return userData.username || null; // Retourne le username ou null si non défini
        } else {
          console.log("No such document!");
          return null;
        }
      })
    );
  }
}
