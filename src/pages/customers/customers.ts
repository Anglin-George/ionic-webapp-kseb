import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-customers',
  templateUrl: 'customers.html',
})
export class CustomersPage {
  userData = {"limit":"all"};
  loading: any;
  resposeData : any;
  customer : any;
  noCustomers : boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController) {
    this.noCustomers = false;
    this.customers();
  }

  customers()
  {
    this.loading = this.loadingController.create({
      content: "loading.please wait..."
    });
    this.loading.present();
    this.authService.postData(this.userData,"customers").then((result)=>{
      this.resposeData = result;
      if(this.resposeData.customersData.length>0)
      {
        this.loading.dismissAll();
        this.customer = this.resposeData.customersData;
      }
      else{
        this.loading.dismissAll();
        this.noCustomers = true;
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
