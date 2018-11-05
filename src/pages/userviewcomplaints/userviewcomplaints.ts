import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-userviewcomplaints',
  templateUrl: 'userviewcomplaints.html',
})
export class UserviewcomplaintsPage {
  userData = {"limit":"all","email":""};
  loading: any;
  resposeData : any;
  complaints : any;
  noComplaints : boolean;
  sessionData : any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController) {
    this.noComplaints = false;
    this.viewComplaints();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserviewcomplaintsPage');
  }
  viewComplaints(){
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    this.userData.email=this.sessionData.userData.email;
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.userData,"usercomplaints").then((result)=>{
      this.resposeData = result;
      if(this.resposeData.complaintData.length>0)
      {
        this.loading.dismissAll();
        this.noComplaints = false;
        this.complaints = this.resposeData.complaintData;        
      }
      else{
        this.loading.dismissAll();
        this.noComplaints = true;
      }            
    }, (err) => {
      this.loading.dismissAll();
      this.noComplaints = true;
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
    this.authService.postData(this.userData,"usercomplaints").then((result)=>{
      this.resposeData = result;
      if(this.resposeData.complaintData.length>0)
      {
        refresher.complete();
        this.noComplaints = false;
        this.complaints = this.resposeData.complaintData;        
      }
      else{
        refresher.complete();
        this.noComplaints = true;
      }            
    }, (err) => {
      refresher.complete();
      this.noComplaints = true;
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
