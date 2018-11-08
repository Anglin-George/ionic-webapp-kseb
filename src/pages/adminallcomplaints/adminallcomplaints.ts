import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-adminallcomplaints',
  templateUrl: 'adminallcomplaints.html',
})
export class AdminallcomplaintsPage {
  userData = {"limit":"All"};
  loading: any;
  resposeData : any;
  complaint : any;
  noComplaint : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController) {
    this.noComplaint=false;
    this.complaints();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminallcomplaintsPage');
  }
  complaints(){
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.userData,"getcomplaints").then((result)=>{
      this.resposeData = result;
      if(this.resposeData.complaintData.length>0)
      {
        this.loading.dismissAll();
        this.complaint = this.resposeData.complaintData;
      }
      else{
        this.loading.dismissAll();
        this.noComplaint = true;
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
