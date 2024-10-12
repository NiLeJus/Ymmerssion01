import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app'

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

const firebaseConfig = {
  apiKey: "AIzaSyDb4-YJNJ8XzPdTauldWBYQSzgkMIWIy0k",
  authDomain: "fir-app-messenger-4e363.firebaseapp.com",
  projectId: "fir-app-messenger-4e363",
  storageBucket: "fir-app-messenger-4e363.appspot.com",
  messagingSenderId: "104853348862",
  appId: "1:104853348862:web:8336f6a3e0d3ab02c0a0af",
  measurementId: "G-1C56JH7DZB"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideClientHydration(),
  ],
};
