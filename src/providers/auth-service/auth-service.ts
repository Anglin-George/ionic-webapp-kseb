import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
let apiUrl = "http://iot.fabstudioz.com/api/";
// let apiUrl = "http://localhost:8080/PHP-Slim-Restful/api/";
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient, public htttp:Http) {
    console.log('Hello AuthServiceProvider Provider');
  }

  postData(credentials, type){
    return new Promise((resolve,reject)=>{ 
      let headers = new Headers();
      this.htttp.post(apiUrl+type,JSON.stringify(credentials),{headers : headers}).subscribe( res => {
        resolve(res.json());
      },(err) =>{
        reject(err);
      });
    });
  }
}
