import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController  } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

@IonicPage()
@Component({
  selector: 'page-userconnectionstatus',
  templateUrl: 'userconnectionstatus.html',
})
export class UserconnectionstatusPage {
  userData = {"mobile":""};
  resposeData : any;
  loading: any;
  connectionrequest: any;
  noReq : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public toastCtrl: ToastController,public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserconnectionstatusPage');
  }
  connectionStatus(){
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.userData,"connectionStatus").then((result)=>{
      this.resposeData = result;
      this.loading.dismissAll();
      if(this.resposeData.connectionData.length>0)
      {
        this.noReq = false; 
        this.connectionrequest=this.resposeData.connectionData;
      }else{
        this.noReq = true;
        const toast = this.toastCtrl.create({
              message: this.resposeData.error.text,
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
