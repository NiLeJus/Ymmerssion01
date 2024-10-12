import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../../../services/register.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register-screen',
  standalone: true,
  templateUrl: './register-screen.component.html',
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
