import { Component } from '@angular/core';
import { NavController, AlertController, Platform } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

import { Socket, Presence } from 'phoenix';

import { ChatPage } from '../chat/chat';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  url: string;
  user = { username: '' };
  socket: Socket;
  headers: Headers;

  constructor(public navCtrl: NavController, public alertCtrl : AlertController, public http: Http, public platform:Platform) {
    this.headers = new Headers();
    // this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    this.url = this.platform.is('cordova') ? 'localhost:4000/api' : '/api';
  }

  login() {
    this.http.post(this.url + '/users', { user: this.user }, { headers: this.headers })
      .map(res => res.json)
      .subscribe(
        res => {
          this.socket = new Socket('/socket', {
            params: { user: this.user }
          });
          this.socket.connect()
          this.navCtrl.push(ChatPage);
        },
        err => {
          console.log(err);
        }
      );
  }
}
