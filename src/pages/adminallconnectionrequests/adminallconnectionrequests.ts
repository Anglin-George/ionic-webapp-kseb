import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-adminallconnectionrequests',
  templateUrl: 'adminallconnectionrequests.html',
})
export class AdminallconnectionrequestsPage {
  userData = {"limit":"all"};
  loading: any;
  resposeData : any;
  connectionrequest : any;
  noConnectionrequest : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController) {
    this.noConnectionrequest = false;
    this.connectionrequests();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminallconnectionrequestsPage');
  }
  connectionrequests(){
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.userData,"getconnectionrequests").then((result)=>{
      this.resposeData = result;
      if(this.resposeData.connectionData.length>0)
      {
        this.loading.dismissAll();
        this.connectionrequest = this.resposeData.connectionData;
        console.log(this.connectionrequest);
      }
      else{
        this.loading.dismissAll();
        this.noConnectionrequest = true;
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
