import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AdminhomePage } from '../adminhome/adminhome';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  resposeData : any;
  sessionData : any;
  userData = {"email":"","password":""};

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController,public modalCtrl : ModalController) {
    if(localStorage.getItem('userData'))
    {
      this.sessionData = JSON.parse(localStorage.getItem('userData'));
      // console.log(this.sessionData.email);
      if(this.sessionData.email== "admin")
      {
        this.navCtrl.setRoot(AdminhomePage);
      }
      else{
        this.navCtrl.setRoot(HomePage);
      }      
    }
    else{
      // this.navCtrl.setRoot(WelcomePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  public openModal(){
    var modalPage = this.modalCtrl.create('ModalPage'); modalPage.present(); 
  } 

  public login()
  {
    if(this.userData.email.trim()!="" && this.userData.password.trim()!="")
    {
      if(this.userData.email=="admin" && this.userData.password=="adminpassword")
      {
        localStorage.setItem('userData',JSON.stringify(this.userData));
        this.navCtrl.push(AdminhomePage);
      }
      else{
        console.log("Not admin");
      }
    }
    else
    {
      const toast = this.toastCtrl.create({
        message: 'Please fill every fields',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 2000,
      });
      toast.present();
    }
  }

}
