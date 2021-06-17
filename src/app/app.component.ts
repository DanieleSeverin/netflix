import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'netflix';

  constructor(public _user: UserService) { }

  ngOnInit(): void {
    this._user.initializeUser();
  }

  onActivate(event: Event) {
    window.scroll(0,0);
}
}
