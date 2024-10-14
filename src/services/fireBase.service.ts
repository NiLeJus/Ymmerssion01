import { Injectable, inject } from '@angular/core';
import { Storage, ref, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage'; // Importez correctement Storage
import { Firestore, arrayUnion, collection, doc, getDoc, DocumentReference, updateDoc, addDoc, collectionData } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';
import { TMessage, TMessageWPic } from '../_models/conversation.model';
import { TConversation } from '../_models/conversation.model';

@Injectable({ providedIn: 'root' })
export class FirebaseService {
  // Injection correcte de Storage
  private storage = inject(Storage);

  firestore = inject(Firestore);
  globalRoomCollection = collection(this.firestore, '_global_room');
  conversationCollection = collection(this.firestore, '_conversations');
  userCollection = collection(this.firestore, '_users');

  private isMessageValid(message: TMessage | TMessageWPic): boolean {
    // Vérifier si le message est de type TMessage
    if ('text' in message) {
      return message.text.trim() !== '';
    }
    // Vérifier si le message est de type TMessageWPic
    else if ('documentRef' in message) {
      // Valider le message TMessageWPic
      return message.documentRef !== undefined;
    }

    // Retourne false si le message ne correspond à aucun type valide
    return false;
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

  // Méthode pour uploader une image et renvoyer l'URL
  uploadImage(file: File): Promise<any> {
    const filePath = `images/${new Date().getTime()}_${file.name}`; // Chemin du fichier
    const fileRef = ref(this.storage, filePath); // Utilisation correcte de ref

    const task = uploadBytesResumable(fileRef, file); // Utilisation de uploadBytesResumable


    // Retourne une promesse qui se résout avec l'URL de l'image
    return task.then(() => {
      return getDownloadURL(fileRef); // Récupère l'URL de téléchargement
    });
  }

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
    if (!this.isMessageValid(messageToSend)) {
      throw new Error('Invalid message'); // Ajoutez un message d'erreur pour le débogage
    }
    const docRef = doc(this.firestore, '_conversations', conversationID);
    return from(updateDoc(docRef, { messages: arrayUnion(messageToSend) }));
  }

  // Méthode pour récupérer l'URL du document depuis Firebase Storage
  getDocumentUrl(documentRef: string): Promise<string> {
    const storageRef = ref(this.storage, documentRef); // Utilisez l'instance de FirebaseStorage
    return getDownloadURL(storageRef); // Récupérer l'URL de téléchargement
  }

  async addUserToGlobalConversation(userId: string): Promise<void> {
    const globalConversationDocRef = doc(this.firestore, '_conversations', '0'); // Index 0 de la conversation globale

    // Récupérer la conversation globale
    const globalConversationSnapshot = await getDoc(globalConversationDocRef);

    if (globalConversationSnapshot.exists()) {
      // Mettre à jour la conversation en ajoutant l'utilisateur
      await updateDoc(globalConversationDocRef, {
        users_id: arrayUnion(userId) // Ajoute l'uid à la liste users_id
      });
      console.log(`Utilisateur ${userId} ajouté à la conversation globale.`);
    } else {
      console.error("Conversation globale introuvable.");
    }
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
