import { Component,ViewChild  } from '@angular/core';
import { NavController, MenuController ,App ,AlertController,Nav } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import {UserprofilePage} from '../userprofile/userprofile';
import { UserviewtipsPage } from '../userviewtips/userviewtips';
import { ComplaintregPage } from '../complaintreg/complaintreg';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  // pages: Array<{title: string, component: any}>;
  pages2: any;
  sessionData : any;
  monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  thisMonth :any;
  t= new Date();
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
      complaintPage : ComplaintregPage,
    } 
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    this.thisMonth = this.monthNames[(new Date()).getMonth()];
    console.log(new Date(this.t.getFullYear(), this.t.getMonth() + 1, 0, 23, 59, 59));
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goToSignupPage(){
    // this.navCtrl.push(SignupPage);
  }
  addComplaints(){
    this.navCtrl.push(ComplaintregPage);
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
  viewTips(){
    this.navCtrl.push(UserviewtipsPage);
  }
  doRefresh(refresher) {
    console.log("refresh");
    refresher.complete();
  }
}
