import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  username: string = '';
  password: string = '';
  firstname: string = '';
  lastname: string = '';
  birthdate: Date | undefined = undefined;
  photo_url: string = '';
  user: User;

  constructor() { 
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.populateVariables();
  }

  ngOnInit(): void {
  }

  populateVariables(){
    this.username = this.user.username;
    this.password = this.user.password;
    this.firstname = this.user.firstname || '';
    this.lastname = this.user.lastname || '';
    this.birthdate = this.user.birthdate || undefined;
    this.photo_url = this.user.photo_url || '';
  }

  editUser(){}

}
