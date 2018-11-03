import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController,LoadingController,ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';


@IonicPage()
@Component({
  selector: 'page-userprofileupdate',
  templateUrl: 'userprofileupdate.html',
})
export class UserprofileupdatePage {
  sessionData : any;
  newSessionData : any;
  resposeData : any;
  loading: any;
  profile = {"name" : "", "mobilenumber":"","email":""};
  constructor(public navCtrl: NavController, public authService: AuthServiceProvider,public navParams: NavParams,  public viewCtrl : ViewController,public toastCtrl: ToastController, public loadingController:LoadingController) {
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    this.profile.name=this.sessionData.userData.name;
    this.profile.mobilenumber=this.sessionData.userData.mobilenumber;
    this.profile.email=this.sessionData.userData.email;
    console.log(this.sessionData);
  }

  updateProfile(){
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.profile,"profileupdate").then((result)=>{
      this.resposeData = result;
      if(result['error'].text=="")
      {
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Profile Updated',
          showCloseButton: false,
          position : "top",          
          duration: 2000,
        });
        this.profile.name='';
        this.profile.mobilenumber='';
        toast.present();
        localStorage.setItem('userData',JSON.stringify(this.resposeData));
        this.viewCtrl.dismiss(this.resposeData);
      }else{
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Invalid Details',
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

  public closeModal(){
    this.viewCtrl.dismiss();
  }
}
