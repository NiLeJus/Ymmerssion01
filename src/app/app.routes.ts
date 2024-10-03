import { Routes } from '@angular/router';
import { ChatScreenComponent } from '../screens/chat-screen/chat-screen.component';
import { LoggingScreenComponent } from '../screens/logging-screen/logging-screen.component';
import { RegisterScreenComponent } from '../screens/register-screen/register-screen.component';
import { InboxScreenComponent } from '../screens/inbox-screen/inbox-screen.component';
import { LandingScreenComponent } from '../screens/landing-screen/landing-screen.component';

export const routes: Routes = [
  {path: '', component: LandingScreenComponent },
  { path: 'chat', component: ChatScreenComponent },
  { path: 'logging', component: LoggingScreenComponent },
  { path: 'register', component: RegisterScreenComponent },
  { path: 'inbox', component: InboxScreenComponent },
];
