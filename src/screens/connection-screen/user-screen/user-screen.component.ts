import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { Register } from '../../../services/register.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { TUser } from '../../../_models/user.model';

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.css'],
})
export class UserScreenComponent implements OnInit {
  isLogging: boolean = false;
  user: { name: string | null; email: string | null } | null = null;
  _user: WritableSignal<TUser> = signal({
    name: '',
    user_id: '',
    mail: '',
    password: '',
    status: 'offline',
  });

  constructor(
    public registerService: Register,
    private router: Router,
    private afAuth: Auth
  ) {}

  handleLoggout() {
    this.registerService.logout().then(() => {
      console.log('Logged out');
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
    this.afAuth.onAuthStateChanged(async (user) => {
      if (!user) {
        this.isLogging = false;
        this.router.navigate(['/']);
      } else {
        this.isLogging = true;
        // Récupérer le profil complet (nom et email)
        const userInfo = await this.registerService.getUserName(user.uid); // { name, email }
        if (userInfo) {
          this.user = userInfo;
          console.log(`User logged in:`, this.user);

          // Mettre à jour le signal _user avec l'objet TUser
          this._user.set({
            name: this.user.name || '',
            user_id: user.uid,
            mail: this.user.email || '',
            password: '', // Remplir selon ce qui est disponible
            status: 'online',
          });
        }
      }
    });
  }
}
