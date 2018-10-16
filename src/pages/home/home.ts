import { Component,ViewChild  } from '@angular/core';
import {  Nav } from 'ionic-angular';
import { NavController, MenuController ,App ,AlertController } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  pages: Array<{title: string, component: any}>;
  constructor(public navCtrl: NavController,menu: MenuController,public app: App,public alertCtrl: AlertController) {
    menu.enable(true);
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Home 2', component: HomePage }
    ];
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goToSignupPage(){
    // this.navCtrl.push(SignupPage);
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

}
