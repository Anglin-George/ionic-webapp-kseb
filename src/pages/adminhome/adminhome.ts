import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  Nav } from 'ionic-angular';
import {  MenuController ,App ,AlertController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { SignupPage } from '../signup/signup';
import { CustomersPage } from '../customers/customers';
import { TipsPage } from '../tips/tips';
/**
 * Generated class for the AdminhomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adminhome',
  templateUrl: 'adminhome.html',
})
export class AdminhomePage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController, public navParams: NavParams,menu: MenuController,public app: App,public alertCtrl: AlertController) {
    // menu.enable(true);
    // this.pages = [
    //   { title: 'Home', component: AdminhomePage },
    //   { title: 'Home 2', component: AdminhomePage }
    // ];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminhomePage');
  }

  doConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are u sure, Logout?',
      message: 'App should logout your session..!',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No Logout');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            localStorage.clear();
            const root = this.app.getRootNav();
            root.popToRoot();
            this.navCtrl.setPages([
              { page: WelcomePage }
            ]);
          }
        }
      ]
    });
    confirm.present()
  }

  viewUsers(){
    this.navCtrl.push(CustomersPage);
  }

  viewTips(){
    this.navCtrl.push(TipsPage);
  }
  addCustomer(){
    this.navCtrl.push(SignupPage);
  }
  viewComplaints(){

  }
  viewConnectionRequests(){
    
  }
}
