import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { AdminallcomplaintsPage } from '../adminallcomplaints/adminallcomplaints';

@IonicPage()
@Component({
  selector: 'page-admincomplaints',
  templateUrl: 'admincomplaints.html',
})
export class AdmincomplaintsPage {
  userData = {"limit":"Pending"};
  loading: any;
  resposeData : any;
  complaint : any;
  noComplaint : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController) {
  this.noComplaint=false;
  this.complaints();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdmincomplaintsPage');
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
  viewAllComplaints(){
    this.navCtrl.push(AdminallcomplaintsPage);
  }
  solveComplaint(item,complaintIndex){
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(item,"updatecomplaint").then((result)=>{
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
    this.complaint.splice(complaintIndex,1);
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
