import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from './../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-screen',
  standalone: true,
  template: `
    <h1>Inscrivez-vous</h1>
    <form [formGroup]="profileForm" (ngSubmit)="handleSubmit()">
      <label>
        Name
        <input type="text" formControlName="name" />
      </label>
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
  ngOnInit() {}
}
