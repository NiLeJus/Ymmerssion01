import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from '../../../services/register.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { NgClass } from '@angular/common';
import { HeaderComponent } from '../../../shared-components/header/header.component';
@Component({
  selector: 'app-logging-screen',
  standalone: true,
  templateUrl: './logging-screen.component.html',
  imports: [ReactiveFormsModule, NgClass, HeaderComponent],
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
      this.loggingService.loginWithGoogle()
        .then((userCredential) => {
          console.log('Utilisateur Google connecté:', userCredential.user);
          this.router.navigate(['/']);
        })
        .catch((error) => {
          console.error('Erreur de connexion Google:', error);
        });
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
