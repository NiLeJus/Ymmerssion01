import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from './../../services/register.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
@Component({
  selector: 'app-logging-screen',
  standalone: true,
  template: `
    <h1>Connectez-vous</h1>
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label>
        Email
        <input type="email" formControlName="email" />
      </label>
      <label>
        Mot de passe
        <input type="password" formControlName="password" />
      </label>
      <button type="submit" [disabled]="!profileForm.valid">Submit</button>
    </form>
  `,
  imports: [ReactiveFormsModule],
})
export class LoggingScreenComponent {
  islogging: boolean = false;

  constructor(public loggingService: Register, private router: Router, private afAuth: Auth) {}
  user: string | null = null;
  
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
        .then(() =>{ alert('Connexion réussi !'); this.router.navigate(['/'])}
        )
        .catch((err) => alert("Erreur lors de la connexion : " + err.message));
    } else {
      alert('Tous les champs doivent être remplis');
    }
  }
  ngOnInit() {
    this.afAuth.onAuthStateChanged(async (user) => {
      if(!user) {
        this.islogging = false;
      } else {
        this.islogging = true;
        this.router.navigate(['user-profile'])
      }
    })
  }
}
