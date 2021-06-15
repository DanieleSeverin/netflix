import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  username: string = '';
  password: string = '';
  checkbox: any;

  constructor(public _user: UserService) { }

  ngOnInit(): void {
    this.checkbox = false;
  }

  closeLoginForm(event: any){
    if(event != null){
      event.preventDefault();
    }

    this._user.isLoginFormOpen = false;
  }

  login(){
    this._user.login({username: this.username, password: this.password}).subscribe(
        (res: any) => {
          if(this.checkbox){
            this.rememberMe(res);
          }
          this._user.loggedUser = res;
          this.closeLoginForm(null);
        }
    );
  }

  rememberMe(user: User){
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', user.token);
  }

}
