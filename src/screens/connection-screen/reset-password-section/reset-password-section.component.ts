import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Register } from '../../services/register.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password-section',
  standalone: true,
  template: `
    <div class="mx-auto flex-col flex items-center text-white max-sm:p-2.5">
      <h1 class="text-xl">Mot de passe oublié</h1>
      <form class="lg:w-2/6 md:w-3/6 sm:w-full mt-10 grid items-center grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-1 border-b border-gray-900/10 pb-12" [formGroup]="resetForm" (ngSubmit)="handleSubmit()">
        <label class="flex flex-col" for="email">Adresse électronique</label>
        <input class=" mt-2.5 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="email" formControlName="email" />
        <button class=" text-white m-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  [ngClass]="{ 'button-animated': resetForm.valid }" type="submit" [disabled]="!resetForm.valid">Envoyer</button>
        <button (click)="removedAction()" class="bg-white text-black m-0 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"  type="cancel" >Retour</button>
      </form>
    </div>
  `,
  imports: [ReactiveFormsModule, NgClass],
})
export class ResetPasswordSectionComponent implements OnInit {
  resetForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private Register: Register, private router: Router) {}

  handleSubmit() {
    const email = this.resetForm.value.email;
    if (email) {
      this.Register.resetPassword(email)
        .then(() => {
          alert('Email de réinitialisation envoyé !');
          this.router.navigate(['/logging']);
        })
        .catch((err) => alert('Erreur : ' + err.message));
    }
  }

  removedAction() {
    this.router.navigate(['/logging']);
  }

  ngOnInit() {}
}
