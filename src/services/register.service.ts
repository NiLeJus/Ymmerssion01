import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail, signInWithPopup, GoogleAuthProvider } from '@angular/fire/auth';
import { Firestore, setDoc, getDoc, doc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Register { 

  constructor(private auth: Auth, private firestore: Firestore) {}

  async register(name: string, email: string, password: string) {
    console.log('Enregistrement avec:', name, email, password);
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const userId = userCredential.user.uid;

    // Sauvegarde du nom et de l'email dans la Realtime Database
    await setDoc(doc(this.firestore, 'users' , userId), {
      name,
      email,
    });

    return userCredential;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  loginWithGoogle(){
    const provider = new GoogleAuthProvider;
    return signInWithPopup(this.auth, provider)
  }

  logout() {
    return signOut(this.auth);
  }

  resetPassword(email: string) {
    return sendPasswordResetEmail(this.auth, email);
  }

  async getUserName(userId: string) {
    const userRef = doc(this.firestore, 'users', userId);
    const userSnapshot  = await getDoc(userRef);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();
      return userData ? userData['name'] : null;
    } else {
      return null;
    }
  }
}
