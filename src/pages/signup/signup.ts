import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { LoadingController } from 'ionic-angular';

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
  loading: any;
  userData = {"name":"","email":"","password":"","mobilenumber":"","consumernumber":"","devicenumber":""};
  constructor(public navCtrl: NavController,public navParams: NavParams, public authService: AuthServiceProvider, public toastCtrl: ToastController, private network: Network, public loadingController:LoadingController) {
  }

  signUp(){  
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();

    this.authService.postData(this.userData,"signup").then((result)=>{
      this.resposeData = result;
      //console.log(result['error'].text);
      if(result['error'].text=="")
      {
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Registration Success',
          showCloseButton: false,
          position : "top",          
          duration: 2000,
        });
        this.userData.name='';
        this.userData.email='';
        this.userData.password='';
        this.userData.mobilenumber='';
        this.userData.consumernumber='';
        this.userData.devicenumber='';
        toast.present();
      }else{
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Incorrect Registration Details',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 3000,
        });
        toast.present();
      }
    }, (err) => {
      this.loading.dismissAll();
      const toast = this.toastCtrl.create({
        message: 'Network Error',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 3000,
      });
      toast.present();
    });
  }
}
