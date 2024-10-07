import { ApplicationConfig, provideZoneChangeDetection } from "@angular/core";
import { provideRouter } from "@angular/router";
import { routes } from "./app.routes";
import { provideClientHydration } from "@angular/platform-browser";
import { initializeApp, provideFirebaseApp } from "@angular/fire/app";
import { getAuth, provideAuth } from '@angular/fire/auth'; // Utilisation de la version moderne

const firebaseConfig = {
  apiKey: "AIzaSyCjfe-rrErCPOMGahgIxdh6iPW5tuKhxu0",
  authDomain: "sample-firebase-ai-app-491ba.firebaseapp.com",
  databaseURL: "https://sample-firebase-ai-app-491ba-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sample-firebase-ai-app-491ba",
  storageBucket: "sample-firebase-ai-app-491ba.appspot.com",
  messagingSenderId: "303273104085",
  appId: "1:303273104085:web:56f021fffa813b2555085c",
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ],
};
