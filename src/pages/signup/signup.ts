import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  resposeData : any;
  userData = {"name":"","email":"","password":"","mobilenumber":""};
  constructor(public navCtrl: NavController, public authService: AuthServiceProvider, public toastCtrl: ToastController) {
  }
  signUp(){    
    this.authService.postData(this.userData,"signup").then((result)=>{
      this.resposeData = result;
      //console.log(result['error'].text);
      if(result['error'].text=="")
      {
        localStorage.setItem('userData',JSON.stringify(this.resposeData));
        this.navCtrl.push(HomePage);
      }else{
        const toast = this.toastCtrl.create({
          message: 'Incorrect Registration Details',
          showCloseButton: true,
          closeButtonText: 'Ok'
        });
        toast.present();
      }
    }, (err) => {
      const toast = this.toastCtrl.create({
        message: 'Registration Error',
        showCloseButton: true,
        closeButtonText: 'Ok'
      });
      toast.present();
    });
  }
}
