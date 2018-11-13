import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController,LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-userdailyreading',
  templateUrl: 'userdailyreading.html',
})
export class UserdailyreadingPage {
  data = {"devicenumber":""};
  loading: any;
  resposeData : any;
  livedatareading : any;
  devicenumber : any;
  sessionData : any;
  noReading : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController) {
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    this.data.devicenumber=this.sessionData.userData.devicenumber;
    this.livedatareading=0;
    this.livereading();
    this.noReading=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserdailyreadingPage');
  }
  livereading(){
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.data,"dailylivereading").then((result)=>{
      this.resposeData = result;
      if(this.resposeData.liveData.length>0)
      {
        this.loading.dismissAll();
        this.livedatareading = this.resposeData.liveData;
        this.noReading=false;
      }
      else{
        this.loading.dismissAll();
        this.noReading=true;
      }            
    }, (err) => {
      this.loading.dismissAll();
      this.noReading=true;
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
