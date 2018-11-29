import { Component,ViewChild  } from '@angular/core';
import { NavController, MenuController ,App ,AlertController,Nav } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import {UserprofilePage} from '../userprofile/userprofile';
import { UserviewtipsPage } from '../userviewtips/userviewtips';
import { ComplaintregPage } from '../complaintreg/complaintreg';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController,LoadingController } from 'ionic-angular';
import { UserdailyreadingPage } from '../userdailyreading/userdailyreading';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { UserpaymentPage } from '../userpayment/userpayment';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Nav) nav: Nav;
  // pages: Array<{title: string, component: any}>;
  data = {"devicenumber":""};
  loading: any;
  resposeData : any;
  livedatareading : any;
  maxlivereading : any;
  minlivereading : any;
  pages2: any;
  devicenumber : any;
  sessionData : any;
  payamount : any;
  usdpayment : any;
  monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  thisMonth :any;
  t= new Date();
  constructor(public navCtrl: NavController,menu: MenuController,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController,public app: App,public alertCtrl: AlertController,public payPal: PayPal) {
    menu.enable(true);
    // this.pages = [
    //   { title: 'Connection Request', component: HomePage },
    //   { title: 'Compalint Registration', component: HomePage },
    //   { title: 'Paymeny History', component: HomePage }
    // ];

    this.pages2 = {
      profilePage: UserprofilePage,
      homePage: HomePage,
      feedbackPage: UserpaymentPage,
      complaintPage : ComplaintregPage,
    } 
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    this.data.devicenumber=this.sessionData.userData.devicenumber
    //console.log(this.data);
    this.thisMonth = this.monthNames[(new Date()).getMonth()];
    console.log(new Date(this.t.getFullYear(), this.t.getMonth() + 1, 0, 23, 59, 59));
    this.livedatareading=0;
    this.maxlivereading=0;
    this.minlivereading=0;
    this.payamount=0;
    this.livereading();
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  goToSignupPage(){
    // this.navCtrl.push(SignupPage);
  }
  addComplaints(){
    this.navCtrl.push(ComplaintregPage);
  }
  doConfirm() {
    let confirm = this.alertCtrl.create({
      title: 'Are u sure, Logout?',
      message: 'App should logout your session..!',
      buttons: [
        {
          text: 'No',
          handler: () => {
            console.log('No Logout');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            localStorage.clear();
            const root = this.app.getRootNav();
            root.popToRoot();
            this.navCtrl.setPages([
              { page: WelcomePage }
            ]);
          }
        }
      ]
    });
    confirm.present()
  }
  viewTips(){
    this.navCtrl.push(UserviewtipsPage);
  }
  doRefresh(refresher) {
    this.livereading();
    refresher.complete();
  }
  livereading(){
    // this.loading = this.loadingController.create({
    //   content: "loading.please wait..."
    // });
    // this.loading.present();
    this.authService.postData(this.data,"livereading").then((result)=>{
      this.resposeData = result;
      console.log(this.resposeData);
      if(this.resposeData.liveData.length>0 && this.resposeData.firstData.length>0)
      {
        //this.loading.dismissAll();
        //this.livedatareading = this.resposeData.liveData;
        for(let data of this.resposeData.liveData){
          //console.log(data);
          this.maxlivereading=data.maxlivereading;
        } 
        for(let data of this.resposeData.firstData){
          //console.log(data);
          this.minlivereading=data.minlivereading;
        }   
        this.livedatareading = this.maxlivereading - this.minlivereading;
        this.livedatareading =  Math.round(this.livedatareading * 100) / 100;
        if(this.livedatareading>=0 && this.livedatareading<=300)
        {
          this.payamount = 5*this.livedatareading;
        }else if(this.livedatareading <= 350)
        {
          this.payamount = 5.7*this.livedatareading;
        }else if(this.livedatareading <= 400)
        {
          this.payamount = 6.1*this.livedatareading;
        }else if(this.livedatareading <= 500)
        {
          this.payamount = 6.7*this.livedatareading;
        }else{
          this.payamount = 7.50*this.livedatareading;
        }
      }
      else{
        this.livedatareading=0;
        //this.loading.dismissAll();
      }            
    }, (err) => {
      //this.loading.dismissAll();
      const toast = this.toastCtrl.create({
        message: 'Network Error',
        showCloseButton: true,
        closeButtonText: 'Ok',
        duration: 3000,
      });
      toast.present();
    });
  }

  viewreading(){
    this.navCtrl.push(UserdailyreadingPage);
  }

  payonpaypal(){
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'AVubMmSOjdxZp-bwtLCvs7nWPF6H16B6Rn8zmSNpN2jdHB4YlkxvNpWAJmuMVGGlgYCKPA1EGFtXUAxA'
    }).then(() => {
      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        this.usdpayment = this.payamount*0.014;
        let payment = new PayPalPayment(this.usdpayment, 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          alert("Done");
          // Successfully paid
    
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
}
