import { Component,ViewChild  } from '@angular/core';
import { NavController, MenuController ,App ,AlertController,Nav } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import {UserprofilePage} from '../userprofile/userprofile';
import { UserviewtipsPage } from '../userviewtips/userviewtips';
import { ComplaintregPage } from '../complaintreg/complaintreg';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ToastController,LoadingController } from 'ionic-angular';
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
  pages2: any;
  devicenumber : any;
  sessionData : any;
  monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  thisMonth :any;
  t= new Date();
  constructor(public navCtrl: NavController,menu: MenuController,public authService: AuthServiceProvider, public loadingController:LoadingController,public toastCtrl: ToastController,public app: App,public alertCtrl: AlertController) {
    menu.enable(true);
    // this.pages = [
    //   { title: 'Connection Request', component: HomePage },
    //   { title: 'Compalint Registration', component: HomePage },
    //   { title: 'Paymeny History', component: HomePage }
    // ];

    this.pages2 = {
      profilePage: UserprofilePage,
      homePage: HomePage,
      feedbackPage: HomePage,
      complaintPage : ComplaintregPage,
    } 
    this.sessionData = JSON.parse(localStorage.getItem('userData'));
    this.data.devicenumber=this.sessionData.userData.devicenumber
    //console.log(this.data);
    this.thisMonth = this.monthNames[(new Date()).getMonth()];
    console.log(new Date(this.t.getFullYear(), this.t.getMonth() + 1, 0, 23, 59, 59));
    this.livedatareading=0;
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
    //console.log("refresh");
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
      if(this.resposeData.liveData.length>0)
      {
        //this.loading.dismissAll();
        this.livedatareading = this.resposeData.liveData;
        for(let data of this.resposeData.liveData){
          console.log(data);
          this.livedatareading=data.livereading;
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
}
