import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Register } from './../../../services/register.service';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import { HeaderComponent } from '../../../shared-components/header/header.component';

@Component({
  selector: 'app-reset-password-section',
  standalone: true,
  templateUrl: './reset-password-section.component.html',
  imports: [ReactiveFormsModule, NgClass, HeaderComponent],
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
