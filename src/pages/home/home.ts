import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  users: any[] = [];

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.getUsers();
  }

  getUsers() {
    this.storage.ready().then(() => {
      this.storage.forEach((v, k, i) => {
        if(k.indexOf('user-')===0) {
          this.users.push(v);
        }
      });
    });
  }

  addUser(name, age) {
    this.storage.ready().then(() => {
      let user = {
        id: this.genRandomId(),
        name: name.value,
        age: age.value
      };
      this.storage.set('user-' + user.id, user);
      this.users.push(user);
      name.value = '';
      age.value = '';
    });
    console.log(this.users);
  }

  removeUser(user) {
    this.storage.ready().then(() => {
      this.storage.remove('user-' + user.id);
      this.users.splice(this.users.indexOf(user),1);
    })
  }

  genRandomId() {
    return Math.floor(Math.random() * 9999);
  }

}
