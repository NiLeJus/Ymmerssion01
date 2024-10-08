import { Routes } from '@angular/router';
import { ChatScreenComponent } from '../screens/chat-screen/chat-screen.component';
import { LoggingScreenComponent } from '../screens/logging-screen/logging-screen.component';
import { RegisterScreenComponent } from '../screens/register-screen/register-screen.component';
import { InboxScreenComponent } from '../screens/inbox-screen/inbox-screen.component';
import { LandingScreenComponent } from '../screens/landing-screen/landing-screen.component';
import { UserScreenComponent } from '../screens/user-screen/user-screen.component';
import { ResetPasswordComponent } from '../screens/reset-password-screen/reset-password.component';

export const routes: Routes = [
  { path: 'landing', component: LandingScreenComponent },
  { path: 'chat', component: ChatScreenComponent },
  { path: 'logging', component: LoggingScreenComponent },
  { path: 'register', component: RegisterScreenComponent },
  { path: 'inbox', component: InboxScreenComponent },
  { path: 'user-profile', component: UserScreenComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
];
