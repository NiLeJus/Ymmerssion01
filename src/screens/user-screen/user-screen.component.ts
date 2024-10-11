import { Component, OnInit } from '@angular/core';
import { Register } from '../../services/register.service';
import { Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-screen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-screen.component.html',
  styleUrls: ['./user-screen.component.css'],
})
export class UserScreenComponent implements OnInit {
  isLogging: boolean = false;
  user: string | null = null;

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
        this.user = await this.registerService.getUserName(user.uid); // Récupère le nom de l'utilisateur
        console.log(`User logged in: ${this.user}`);
      }
    })

  }
}
