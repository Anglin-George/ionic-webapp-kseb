import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Nav,MenuController ,App,ModalController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { UserprofileupdatePage } from '../userprofileupdate/userprofileupdate';
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
  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public navParams: NavParams,menu: MenuController,public app: App,) {
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    menu.enable(true);
    this.pages2 = {
      profilePage: UserprofilePage,
      homePage: HomePage,
      feedbackPage: HomePage,
    } 
  }

  editProfile(){
    let profileModal = this.modalCtrl.create(UserprofileupdatePage);
    profileModal.present();
    profileModal.onDidDismiss((result) =>{
      if(result){
        this.sessionData=result;
      }
    });
  }
}
