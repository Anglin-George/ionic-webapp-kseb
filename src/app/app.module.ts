import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SignupPage } from '../pages/signup/signup';
import { WelcomePage } from '../pages/welcome/welcome';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AdminhomePage } from '../pages/adminhome/adminhome';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { CustomersPage } from '../pages/customers/customers';
import { MomentModule } from 'angular2-moment';
import { TipsPage } from '../pages/tips/tips';
import { AddtipsPage } from '../pages/addtips/addtips';
import { MomentTimezoneModule } from 'angular-moment-timezone';
import { UserprofilePage } from '../pages/userprofile/userprofile';
import { UserviewtipsPage } from '../pages/userviewtips/userviewtips';
import { UserprofileupdatePage } from '../pages/userprofileupdate/userprofileupdate';
import { ComplaintregPage } from '../pages/complaintreg/complaintreg';
import { UserviewcomplaintsPage } from '../pages/userviewcomplaints/userviewcomplaints';
import { UsernewconnectionPage } from '../pages/usernewconnection/usernewconnection';
import { UserconnectionstatusPage } from '../pages/userconnectionstatus/userconnectionstatus';
import { AdminconnectionrequestsPage } from '../pages/adminconnectionrequests/adminconnectionrequests';
import { AdminallconnectionrequestsPage } from '../pages/adminallconnectionrequests/adminallconnectionrequests';
import { AdmincomplaintsPage } from '../pages/admincomplaints/admincomplaints';
import { AdminallcomplaintsPage } from '../pages/adminallcomplaints/adminallcomplaints';
import { UserdailyreadingPage } from '../pages/userdailyreading/userdailyreading';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';
import { UserpaymentPage } from '../pages/userpayment/userpayment';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    WelcomePage,
    AdminhomePage,
    CustomersPage,
    TipsPage,
    AddtipsPage,
    UserprofilePage,
    UserviewtipsPage,
    UserprofileupdatePage,
    ComplaintregPage,
    UserviewcomplaintsPage,
    UsernewconnectionPage,
    UserconnectionstatusPage,
    AdminconnectionrequestsPage,
    AdminallconnectionrequestsPage,
    AdmincomplaintsPage,
    AdminallcomplaintsPage,
    UserdailyreadingPage,
    UserpaymentPage,
  ],
  imports: [
    BrowserModule,HttpModule,HttpClientModule,MomentModule,MomentTimezoneModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    WelcomePage,
    AdminhomePage,
    CustomersPage,
    TipsPage,
    AddtipsPage,
    UserprofilePage,
    UserviewtipsPage,
    UserprofileupdatePage,
    ComplaintregPage,
    UserviewcomplaintsPage,
    UsernewconnectionPage,
    UserconnectionstatusPage,
    AdminconnectionrequestsPage,
    AdminallconnectionrequestsPage,
    AdmincomplaintsPage,
    AdminallcomplaintsPage,
    UserdailyreadingPage,
    UserpaymentPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    Network,
    PayPal,
  ]
})
export class AppModule {}
