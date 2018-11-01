import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav,MenuController ,App } from 'ionic-angular';
import { HomePage } from '../home/home';
/**
 * Generated class for the UserprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userprofile',
  templateUrl: 'userprofile.html',
})
export class UserprofilePage {
  @ViewChild(Nav) nav: Nav;
  sessionData : any;
  pages2: any;
  menu : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,menu: MenuController,public app: App,) {
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    menu.enable(true);
    this.pages2 = {
      profilePage: UserprofilePage,
      homePage: HomePage,
      feedbackPage: HomePage,
    } 
  }
  ionViewDidEnter() {
    this.menu.enable(true, "hamburger-menu");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserprofilePage');
  }
}
