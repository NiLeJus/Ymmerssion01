import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from './../../services/register.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register-screen',
  standalone: true,
  template: `
  <div class="mx-auto flex-col flex items-center text-white max-sm:p-2.5">
    <h1 class="text-xl">Inscrivez-vous</h1>
    <form class="lg:w-2/6 md:w-3/6 sm:w-full mt-10 grid items-center grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1 border-b border-gray-900/10 pb-12" [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label class="flex flex-col">
        Prénom
        <input class=" mt-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" formControlName="name" />
      </label>
      <label class="flex flex-col">
        Email
        <input class="mt-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="email" formControlName="email" />
      </label>
      <label class="flex flex-col">
        Mot de passe
        <input class="mt-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="password" formControlName="password" />
      </label>
      <button  class=" text-white m-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="submit" [disabled]="!profileForm.valid" [ngClass]="{ 'button-animated': profileForm.valid }" >S'inscrire</button>
      <div><a class=" hover:underline" href="/logging">Déjà un compte ? Connectez-vous</a></div>
    </form>
    <div class="mb-4">
      <p>Ou</p>
    </div>
    <button class="m-0 google-button" type="submit" (click)="HandleGoogle()">
  <div class="flex justify-center items-center google-button-animated">
    <img class="h-4 mr-2" src="https://cdn.prod.website-files.com/6490500a0362c1a424db6d08/649050e81600d893ba045ccd_googlesvg.svg" alt="Google Logo">
    S'inscrire avec Google
  </div>
</button>
    </div>
  `,
  imports: [ReactiveFormsModule, NgClass],
})
export class RegisterScreenComponent implements OnInit {
  constructor(public registerService: Register, private router: Router) {}
  profileForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });
  handleSubmit() {
    const { name, email, password } = this.profileForm.value;
  
    console.log('Valeur du formulaire:', { name, email, password }); // Ajoute des logs ici pour vérifier
  
    if (name && email && password) {
      this.registerService
        .register(name, email, password) // Passer email et password dans le bon ordre
        .then(() =>{ alert('Inscription réussie !'); this.router.navigate(['/'])}
        )
        .catch((err) => alert("Erreur lors de l'inscription : " + err.message));
    } else {
      alert('Tous les champs doivent être remplis');
    }
  }

  HandleGoogle() {
    this.registerService
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
  
  ngOnInit() {}
}
