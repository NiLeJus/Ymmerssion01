import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from './../../services/register.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { getAuth, ProviderId } from 'firebase/auth';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-logging-screen',
  standalone: true,
  template: `
    <div class="mx-auto flex-col flex items-center text-white max-sm:p-2.5">
      <h1 class="text-xl">Connectez-vous</h1>
      <form class="lg:w-2/6 md:w-3/6 sm:w-full mt-10 grid items-center grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1 border-b border-gray-900/10 pb-12" [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
        <label class="flex flex-col">
          Email
          <input class=" mt-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="email" formControlName="email" />
        </label>
        <label class="flex flex-col">
          Mot de passe
          <input class=" mt-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="password" formControlName="password" />
        </label>
        <a class="text-end text-xs hover:underline" href="/reset-password"><p>Vous avez oublié votre mot de passe ?</p></a>
        <button class=" text-white m-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="submit" [disabled]="!profileForm.valid" [ngClass]="{ 'button-animated': profileForm.valid }">Se connecter</button>
        <span>Vous n’avez pas de compte ? <a class="hover:underline" href="/register">S’inscrire maintenant</a></span>
      </form>
      <div class="mb-4">
      <p>Ou</p>
    </div>
      <button class="google-button" type="submit" (click)="HandleGoogle()">
        <div class="flex justify-center items-center google-button-animated">
          <img
            src="https://cdn.prod.website-files.com/6490500a0362c1a424db6d08/649050e81600d893ba045ccd_googlesvg.svg"
          />
          Se connectez avec google
        </div>
      </button>
    </div>
  `,
  imports: [ReactiveFormsModule, NgClass],
})
export class LoggingScreenComponent {
  islogging: boolean = false;

  constructor(
    public loggingService: Register,
    private router: Router,
    private afAuth: Auth
  ) {}
  user: string | null = null;
  auth = getAuth();
  userUID = this.auth.currentUser;

  profileForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  handleSubmit() {
    const { email, password } = this.profileForm.value;

    console.log('Valeur du formulaire:', { email, password }); // Ajoute des logs ici pour vérifier

    if (email && password) {
      this.loggingService
        .login(email, password) // Passer email et password dans le bon ordre
        .then(() => {
          alert('Connexion réussi !');
          this.router.navigate(['/']);
        })
        .catch((err) => alert('Erreur lors de la connexion : ' + err.message));
    } else {
      alert('Tous les champs doivent être remplis');
    }
  }

  HandleGoogle() {
    this.loggingService
      .loginWithGoogle()
      .then((result) => {
        const user = result.user;
        const isGoogleUser = user.providerData.some(
          (provider) => provider.providerId === 'google.com'
        );
        if (isGoogleUser) {
          alert('Connexion réussi avec Google!');
          this.router.navigate(['/']);
        } else {
          alert('Utilisateur non géré par Google');
        }
      })
      .catch((err) => alert('Erreur lors de la connexion : ' + err.message));
  }

  ngOnInit() {
    this.afAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.islogging = false;
      } else {
        this.islogging = true;
        this.router.navigate(['user-profile']);
      }
    });
  }
}
