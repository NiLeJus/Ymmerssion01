import { Injectable, inject } from '@angular/core';
import { getStorage, ref, getDownloadURL, FirebaseStorage } from '@angular/fire/storage';
import { Firestore, addDoc, arrayUnion, collection, collectionData, doc, setDoc, updateDoc, getDoc, DocumentReference } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { TConversation, TMessage, TMessageWPic } from '../_models/conversation.model';
import { TUser } from '../_models/user.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  // Utiliser getStorage pour obtenir l'instance de FirebaseStorage
  private storage = getStorage(); // Obtenez l'instance du Storage

  firestore = inject(Firestore);
  globalRoomCollection = collection(this.firestore, '_global_room');
  conversationCollection = collection(this.firestore, '_conversations');
  userCollection = collection(this.firestore, '_users');

  async getDocumentByRef(ref: string) {
    const documentRef: DocumentReference = doc(this.firestore, ref);
    const documentSnapshot = await getDoc(documentRef);

    if (documentSnapshot.exists()) {
      return documentSnapshot.data();
    } else {
      console.log("No such document!");
      return null;
    }
  }

  sendMessage(conversationID: string, messageToSend: TMessage | TMessageWPic): Observable<void> {
    console.log("Sending Message", messageToSend);
    console.log("At conversation", conversationID);
    const docRef = doc(this.firestore, '_conversations', conversationID);

    const promise = updateDoc(docRef, {
      messages: arrayUnion(messageToSend)
    });

    return from(promise);
  }
  
  // Méthode pour récupérer l'URL du document depuis Firebase Storage
  getDocumentUrl(documentRef: string): Promise<string> {
    const storageRef = ref(this.storage, documentRef); // Utilisez l'instance de FirebaseStorage
    return getDownloadURL(storageRef); // Récupérer l'URL de téléchargement
  }

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

  createConversation(conversationToCreate: TConversation) {
    conversationToCreate.timestamp = new Date().toISOString();
    return from(addDoc(this.conversationCollection, conversationToCreate));
  }

  async getUsernameByUid(userId: string): Promise<string | null> {
    const userRef = doc(this.firestore, 'users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return userData ? userData['username'] : null;
    } else {
      return null;
    }
  }


}
