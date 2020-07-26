import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/User';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  readonly apiURL : string;
  public rota: Router;
  public id_user: string;
  public home_resumo: any;

  @Input()
  public session: any;

  constructor(private http : HttpClient, private r: Router){
    this.apiURL = 'http://localhost:3333';
    this.rota = r;
  }

  ngOnInit(): void {
    this.session = JSON.parse(window.localStorage.getItem('currentUser'));
    console.log(this.session);

    this.route.params.subscribe( parametros => {
      if (parametros['id']) {
        this.id_user = parametros['id']
      }
    });

    this.http.get(`${this.apiURL}/getUser/${this.id_user}`)
    .subscribe(result => {
      this.home_resumo = result;
      console.log(this.home_resumo);
    });
  }

}
