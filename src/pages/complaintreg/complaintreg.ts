import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserviewcomplaintsPage } from '../userviewcomplaints/userviewcomplaints';
@IonicPage()
@Component({
  selector: 'page-complaintreg',
  templateUrl: 'complaintreg.html',
})
export class ComplaintregPage {
  userData = {"type":"","description":"","landmark":"","email":"","status":""};
  sessionData : any;
  resposeData : any;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public toastCtrl: ToastController,public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComplaintregPage');
  }

  complaintRegister(){
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    this.userData.email=this.sessionData.userData.email;
    this.userData.status="Pending";
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.userData,"addComplaint").then((result)=>{
      this.resposeData = result;
      //console.log(result['error'].text);
      if(result['error'].text=="")
      {
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Complaint Reported',
          showCloseButton: false,
          position : "top",          
          duration: 2000,
        });
        this.userData.type='';
        this.userData.description='';
        this.userData.landmark='';
        this.userData.email='';
        this.userData.status='';
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

  viewComplaints(){
    this.navCtrl.push(UserviewcomplaintsPage);
  }
}
