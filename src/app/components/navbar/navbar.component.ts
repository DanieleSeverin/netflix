import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public _user: UserService) { }

  ngOnInit(): void {
  }

  showLoginForm(event: Event){
    event.preventDefault();
    this._user.isLoginFormOpen = true;
  }

  logout(event: Event){
    event.preventDefault();
    this._user.logout();
  }
}
