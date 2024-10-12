import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-header-component',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

welcomeMessage = 'Connecte toi non ?'

userConnected = signal(false)

}
