import { Component,ViewChild  } from '@angular/core';
import { NavController, MenuController ,App ,AlertController,Nav } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import {UserprofilePage} from '../userprofile/userprofile';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  // pages: Array<{title: string, component: any}>;
  pages2: any;
  sessionData : any;
  constructor(public navCtrl: NavController,menu: MenuController,public app: App,public alertCtrl: AlertController) {
    menu.enable(true);
    // this.pages = [
    //   { title: 'Connection Request', component: HomePage },
    //   { title: 'Compalint Registration', component: HomePage },
    //   { title: 'Paymeny History', component: HomePage }
    // ];

    this.pages2 = {
      profilePage: UserprofilePage,
      homePage: HomePage,
      feedbackPage: HomePage,
    } 
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    //console.log(this.sessionData.userData.name);
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
