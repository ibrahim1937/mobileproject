import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StorageServiceService } from "../../providers/storage-service.service";



import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  ionicForm : FormGroup;
  isSubmitted = false;
  userData;

  constructor(public formBuilder: FormBuilder,
    private http: HttpClient,
    public storageService : StorageServiceService,
    private router:Router) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required, Validators.minLength(2)]]
    })
  
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  

  submitForm(){
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      // the values are existing
      console.log(this.ionicForm.value)

    this.http.get(`http://localhost:3000/mobile/signin/${this.ionicForm.value.email}/${this.ionicForm.value.password}`)
    .subscribe(data => {

          var object : any = data;
        
          StorageServiceService.user_id = object.id ;
          // retrieving the user details
          // this.storageService.getStoredData().then((val) => {
          //   this.userData = val;
          //   console.log(val)
          // });
          // console.log(this.userData);

          this.ionicForm.reset();
          this.router.navigateByUrl('dashboard');
        
      })
  }

}
}