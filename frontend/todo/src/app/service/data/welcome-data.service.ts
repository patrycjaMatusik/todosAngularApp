import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URL } from 'src/app/app.constants';

export class HelloWorldBean {
  constructor(public message:string){
  }
}

@Injectable({
  providedIn: 'root'
})
export class WelcomeDataService {

  constructor(private http: HttpClient) { }

  executeHelloWorld(){
    return this.http.get<HelloWorldBean>(`${API_URL}/helloWorldBean`)
  }

  executeHelloWorldWithPathVar(name){
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })

    return this.http.get<HelloWorldBean>(`${API_URL}/helloWorldBean/${name}`, 
    //{headers}
    );
  }

  // createBasicAuthenticationHttpHeader(){
  //   let username = 'user'
  //   let password = 'password'
  //   let basicAuthenticationString = 'Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthenticationString;
  // }
}
