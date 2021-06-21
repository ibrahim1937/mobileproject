import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  ionicForm: FormGroup;

  

  constructor(public formBuilder: FormBuilder,
    private http: HttpClient,
    private router:Router) { 

      this.ionicForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        password: ['', [Validators.required, Validators.minLength(2)]],
        nom: ['', [Validators.required, Validators.minLength(2)]],
        prenom: ['', [Validators.required, Validators.minLength(2)]],
        phone: ['', [Validators.required, Validators.minLength(2)]]
      })
    }

  ngOnInit() {
  }

  submitForm(entries){
    if(!this.ionicForm.valid){
      console.log('not valide')
      console.log(entries);
    }else {
      // send data 

      var headers = new HttpHeaders();
      headers.append('Access-Control-Allow-Origin' , '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
      headers.append('Accept','application/json');
      headers.append('content-type','application/json');

      this.http
      .post<any>('http://localhost:3000/mobile/signup/', entries , {headers : headers}).subscribe((response) => {
        console.log(response);
        this.getToLoginPage(response)
        if (response.statusCode === 200) {
          // Reset the file input
        }
      }, er => {
        console.log(er);
        alert(er);
      });
    }
  }


  getToLoginPage(response){
    if(response.response == 'ok'){
      this.router.navigateByUrl('login');
    } else {
      this.ionicForm.reset();
    }
  }

}
