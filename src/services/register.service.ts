import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider, UserCredential } from '@angular/fire/auth';
import { Firestore, setDoc, getDoc, doc } from '@angular/fire/firestore';
import { TUser } from '../_models/user.model';
import { updateDoc } from 'firebase/firestore';
import { FirebaseService } from './fireBase.service';
@Injectable({
  providedIn: 'root',
})
export class Register {

  constructor(private auth: Auth, private firestore: Firestore, private firebaseService: FirebaseService) {}

  async register(name: string, email: string, password: string, username: string) {
    console.log('Enregistrement avec:', name, email, password, username);
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const userId = userCredential.user.uid;

    // Sauvegarde du nom et de l'email dans la Realtime Database
    await setDoc(doc(this.firestore, 'users' , userId), {
      name,
      email,
      username
    });

    await this.firebaseService.addUserToGlobalConversation(userId);

    return userCredential;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async loginWithGoogle(): Promise<UserCredential>{
    const provider = new GoogleAuthProvider;
    try {
      const userCredential = await signInWithPopup(this.auth, provider)
      const user = userCredential.user;
      const userId = user.uid;

      await updateDoc(doc(this.firestore, 'users', userId), {
        name: user.displayName,
        email: user.email,
        username: user.displayName
      })

      console.log("user found")
      return userCredential;

    } catch (err) {
      console.error("Error signing in with popup", err);
      throw err;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  async getUserName(userId: string): Promise<TUser | null> {
    const userRef = doc(this.firestore, 'users', userId);
    const userSnapshot = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return {
        name: userData?.['name'] || '',
        username: userData?.['username'] || '',
        user_id: userId, // Récupération du docID à partir du paramètre
        mail: userData?.['email'] || '',
        password: '', // Remplir selon ce qui est disponible
        status: 'offline', // Vous pouvez initialiser cela selon vos besoins
      };
    } else {
      return null;
    }
  }

}
