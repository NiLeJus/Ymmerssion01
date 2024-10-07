import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { getDatabase, ref, set, get } from '@angular/fire/database';

@Injectable({
  providedIn: 'root',
})
export class Register {
  private db = getDatabase(); // Accès à la Realtime Database

  constructor(private auth: Auth) {}

  async register(name: string, email: string, password: string) {
    console.log('Enregistrement avec:', name, email, password);
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    const userId = userCredential.user.uid;

    // Sauvegarde du nom et de l'email dans la Realtime Database
    await set(ref(this.db, 'users/' + userId), {
      name,
      email,
    });

    return userCredential;
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logout() {
    return signOut(this.auth);
  }

  async getUserName(userId: string) {
    const userRef = ref(this.db, 'users/' + userId);
    const snapshot = await get(userRef);

    if (snapshot.exists()) {
      return snapshot.val().name;
    } else {
      return null;
    }
  }
}
