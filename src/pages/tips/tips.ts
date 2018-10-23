import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { AddtipsPage } from '../addtips/addtips';
/**
/**
 * Generated class for the TipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html',
})
export class TipsPage {
  userData = {"limit":"all"};
  loading: any;
  resposeData : any;
  tips : any;
  noTips : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController) {
    this.noTips = false;
    this.viewtips();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipsPage1');
  }
  addTips(){
    this.navCtrl.push(AddtipsPage);
  }
  viewtips(){
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.userData,"tips").then((result)=>{
      this.resposeData = result;
      if(this.resposeData.tipsData.length>0)
      {
        this.loading.dismissAll();
        this.tips = this.resposeData.tipsData;
      }
      else{
        this.loading.dismissAll();
        this.noTips = true;
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
