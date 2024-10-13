import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared-components/header/header.component';
import { LoggingScreenComponent } from './logging-screen/logging-screen.component';

@Component({
  selector: 'app-connection-screen',
  standalone: true,
  imports: [HeaderComponent, LoggingScreenComponent],
  templateUrl: './connection-screen.component.html',
  styleUrl: './connection-screen.component.scss'
})
export class ConnectionScreenComponent {

}
