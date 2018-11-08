import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { AdminallconnectionrequestsPage } from '../adminallconnectionrequests/adminallconnectionrequests';
@IonicPage()
@Component({
  selector: 'page-adminconnectionrequests',
  templateUrl: 'adminconnectionrequests.html',
})
export class AdminconnectionrequestsPage {
  userData = {"limit":"Pending"};
  loading: any;
  resposeData : any;
  connectionrequest : any;
  noConnectionrequest : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController) {
    this.noConnectionrequest = false;
    this.connectionrequests();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminconnectionrequestsPage');
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

  approveConnection(item,connectionIndex){
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(item,"updateconnectionrequests").then((result)=>{
    this.loading.dismissAll();
    this.resposeData=result;
    console.log(this.resposeData.error.text);
    const toast = this.toastCtrl.create({
      message: this.resposeData.error.text,
      showCloseButton: true,
      closeButtonText: 'Ok',
      position : "top",
      duration: 3000,
    });
    toast.present(); 
    this.connectionrequest.splice(connectionIndex,1);
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

  viewAllConnectionRequests(){
    this.navCtrl.push(AdminallconnectionrequestsPage);
  }
}
