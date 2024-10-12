import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared-components/header/header.component';
import { BoardScreenComponent } from "../screens/board-screen/board-screen.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, BoardScreenComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'messenger-app';
  welcomeMessage = 'Bernard Tapis'
}
