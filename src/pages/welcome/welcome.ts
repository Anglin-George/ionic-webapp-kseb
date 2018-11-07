import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AdminhomePage } from '../adminhome/adminhome';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { LoadingController } from 'ionic-angular';
import { UsernewconnectionPage } from '../usernewconnection/usernewconnection';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {
  resposeData : any;
  loading: any;
  sessionData : any;
  userData = {"email":"","password":""};

  constructor(public navCtrl: NavController,public authService: AuthServiceProvider, public navParams: NavParams, public toastCtrl: ToastController,public loadingController:LoadingController,public modalCtrl : ModalController) {
    if(localStorage.getItem('userData'))
    {
      this.sessionData = JSON.parse(localStorage.getItem('userData'));
      // console.log(this.sessionData.email);
      if(this.sessionData.email== "admin")
      {
        this.navCtrl.setRoot(AdminhomePage);
      }
      else{
        this.navCtrl.setRoot(HomePage);
      }      
    }
    else{
      // this.navCtrl.setRoot(WelcomePage);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  public openModal(){
    var modalPage = this.modalCtrl.create('ModalPage'); modalPage.present(); 
  } 

  public login()
  {
    if(this.userData.email.trim()!="" && this.userData.password.trim()!="")
    {
      if(this.userData.email=="admin" && this.userData.password=="adminpassword")
      {
        localStorage.setItem('userData',JSON.stringify(this.userData));
        this.navCtrl.push(AdminhomePage);
      }
      else{
        this.loading = this.loadingController.create({
          content: "loading.please wait..."
        });
        this.loading.present();
        this.authService.postData(this.userData,"login").then((result)=>{
          this.resposeData = result;
          //console.log(result['error'].text);
          if(result['error'].text=="")
          {
            this.loading.dismissAll();
            const toast = this.toastCtrl.create({
              message: 'Logged as '+this.resposeData.userData.email,
              showCloseButton: false,
              position : "top",          
              duration: 2000,
            });           
            this.userData.email='';
            this.userData.password='';            
            toast.present();
            localStorage.setItem('userData',JSON.stringify(this.resposeData));
            this.navCtrl.push(HomePage);
          }else{
            this.loading.dismissAll();
            const toast = this.toastCtrl.create({
              message: 'Email or Password is incorrect',
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
    else
    {
      const toast = this.toastCtrl.create({
        message: 'Please fill every fields',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 2000,
      });
      toast.present();
    }
  }

  connectionRequest(){
    this.navCtrl.push(UsernewconnectionPage);
  }

}
