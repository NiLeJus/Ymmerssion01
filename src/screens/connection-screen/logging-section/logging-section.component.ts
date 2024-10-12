import { Component, NgModule, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../../services/register.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { getAuth, ProviderId } from 'firebase/auth';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-logging-section',
  standalone: true,
  templateUrl: 'logging-section.component.scss',
  imports: [ReactiveFormsModule, NgClass],
})
export class LoggingSectionComponent {
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
