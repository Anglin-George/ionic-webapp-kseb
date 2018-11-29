import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController } from 'ionic-angular';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: 'page-userpayment',
  templateUrl: 'userpayment.html',
})
export class UserpaymentPage {
  loading: any;
  resposeData : any;
  sessionData : any;
  noPayments : boolean;
  paymets : any;
  usdpayment : any;
  payamount : any;
  newuserData = {"devicenumber":""};
  paymentUpdate = {"id" : ""};
  constructor(public navCtrl: NavController, public payPal: PayPal,public navParams: NavParams,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController) {
  this.sessionData = JSON.parse(localStorage.getItem('userData'));
  this.newuserData.devicenumber=this.sessionData.userData.devicenumber;
  console.log(this.newuserData.devicenumber);
  this.loadpayment();
  this.noPayments=false;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserpaymentPage');
  }
loadpayment(){
  this.loading = this.loadingController.create({
    content: "loading.please wait..."
  });
  this.loading.present();
  this.authService.postData(this.newuserData,"getpayments").then((result)=>{
    this.resposeData = result;
    if(this.resposeData.paymentData.length>0)
    {
      this.loading.dismissAll();
      console.log(this.resposeData.paymentData);
      this.paymets = this.resposeData.paymentData;
    }
    else{
      this.loading.dismissAll();
      this.noPayments = true;
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

payBill(item,paymentIndex){
  //console.log(item.amount);
  this.payamount = item.amount;
  this.paymentUpdate.id = item.id;
  this.payPal.init({
    PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
    PayPalEnvironmentSandbox: 'AVubMmSOjdxZp-bwtLCvs7nWPF6H16B6Rn8zmSNpN2jdHB4YlkxvNpWAJmuMVGGlgYCKPA1EGFtXUAxA'
  }).then(() => {   
    this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({   
    })).then(() => {
      this.usdpayment = this.payamount*0.014;
      let payment = new PayPalPayment(this.usdpayment, 'USD', 'Description', 'sale');
      this.payPal.renderSinglePaymentUI(payment).then(() => {
        this.loading = this.loadingController.create({
          content: "Payment processing..."
        });
        this.loading.present();
        this.authService.postData(this.paymentUpdate,"updatepayments").then((result)=>{
          this.resposeData = result;
          this.loading.dismissAll();
          item.status=1;
          const toast = this.toastCtrl.create({
            message: this.resposeData.error.text,
            showCloseButton: true,
            position : "top",
            closeButtonText: 'Ok',
            duration: 3000,
          });
          toast.present();      
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
      }, () => {
        const toast = this.toastCtrl.create({
          message: 'Paypal Server Not Available',
          showCloseButton: true,
          closeButtonText: 'Ok',
          duration: 3000,
        });
        toast.present();
      });
    }, () => {
      // Error in configuration
    });
  }, () => {
    // Error in initialization, maybe PayPal isn't supported or something else
  });
}

}
