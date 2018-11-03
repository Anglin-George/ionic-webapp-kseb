import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
/**
 * Generated class for the UserviewtipsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-userviewtips',
  templateUrl: 'userviewtips.html',
})
export class UserviewtipsPage {
  userData = {"limit":"all"};
  loading: any;
  resposeData : any;
  tips : any;
  noTips : boolean;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController,public navParams: NavParams,public authService: AuthServiceProvider,public loadingController:LoadingController,) {
    this.noTips = false;
    this.viewtips();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserviewtipsPage');
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
        this.noTips = false;
        this.tips = this.resposeData.tipsData;        
      }
      else{
        this.loading.dismissAll();
        this.noTips = true;
      }            
    }, (err) => {
      this.loading.dismissAll();
      this.noTips = true;
      const toast = this.toastCtrl.create({
        message: 'Network Error',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 3000,
      });
      toast.present();
    });
  }
  doRefresh(refresher) {
    this.authService.postData(this.userData,"tips").then((result)=>{
      this.resposeData = result;
      if(this.resposeData.tipsData.length>0)
      {
        refresher.complete();
        this.tips = this.resposeData.tipsData;
      }
      else{
        refresher.complete();
        this.noTips = true;
      }            
    }, (err) => {
      refresher.complete();
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
