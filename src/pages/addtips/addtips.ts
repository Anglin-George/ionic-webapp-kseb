import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

/**
 * Generated class for the AddtipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addtips',
  templateUrl: 'addtips.html',
})
export class AddtipsPage {
  resposeData : any;
  loading: any;
  userData = {"tips":""};
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public toastCtrl: ToastController,public loadingController:LoadingController) {
  }

  addTips(){
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();

    this.authService.postData(this.userData,"addTips").then((result)=>{
      this.resposeData = result;
      //console.log(result['error'].text);
      if(result['error'].text=="")
      {
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Tips Send',
          showCloseButton: false,
          position : "top",          
          duration: 2000,
        });
        this.userData.tips='';
        toast.present();
      }else{
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Incorrect Details',
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
