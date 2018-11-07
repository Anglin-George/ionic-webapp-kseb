import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController,ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserconnectionstatusPage } from '../userconnectionstatus/userconnectionstatus';

@IonicPage()
@Component({
  selector: 'page-usernewconnection',
  templateUrl: 'usernewconnection.html',
})
export class UsernewconnectionPage {
  userData = {"type":"","name":"","email":"","mobile":"","address":"","status":""};
  resposeData : any;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider, public toastCtrl: ToastController,public loadingController:LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UsernewconnectionPage');
  }
  connectionRegister(){
    this.userData.status="Pending";
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.userData,"newConnection").then((result)=>{
      this.resposeData = result;
      if(result['error'].text=="")
      {
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: 'Connection Request Send',
          showCloseButton: false,
          position : "top",          
          duration: 2000,
        });
        this.userData.type='';
        this.userData.name='';
        this.userData.mobile='';
        this.userData.address='';
        this.userData.email='';
        this.userData.status='';
        toast.present();
      }else{
        this.loading.dismissAll();
        const toast = this.toastCtrl.create({
          message: result['error'].text,
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

  viewConnectionStatus(){
    this.navCtrl.push(UserconnectionstatusPage);
  }

}
