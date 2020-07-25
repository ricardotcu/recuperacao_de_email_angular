import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  title = 'login';
  profileForm = new FormGroup({
    nome: new FormControl(''),
    email: new FormControl(''),
    senha: new FormControl(''),
    senha_confirmacao: new FormControl('')
  });	
  readonly apiURL : string;
  public rota: Router;

  constructor(private http : HttpClient, private r: Router){
    this.apiURL = 'http://localhost:3333';
    this.rota = r;
  }

  ngOnInit(): void {
  }

  login(user: User) {
    console.log(user);

    if(user.nome !== ""){
      console.log('register');
      this.http.post(`${this.apiURL}/saveUser`, user)
      .subscribe(result => {
        window.localStorage.setItem('currentUser', JSON.stringify(result));
        console.log(result);
      });
    } else {
      if(user.senha !== ""){
        console.log('login');
        this.http.post(`${this.apiURL}/session`, user)
        .subscribe(result => {
          window.localStorage.setItem('currentUser', JSON.stringify(result));
          console.log(result);
        });
      } else {
        console.log('reset pass');
        this.http.post(`${this.apiURL}/forgot`, user)
        .subscribe(result => {
          window.localStorage.setItem('currentUser', JSON.stringify(result));
          console.log(result);
        });
      }
    }
  }
  
  onSubmit() {
    this.login(this.profileForm.value);
  }
}
