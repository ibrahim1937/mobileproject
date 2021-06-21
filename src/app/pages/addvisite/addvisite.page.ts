import { Component, OnInit , ChangeDetectorRef, ViewChild , ElementRef } from '@angular/core';

import { FormGroup, FormBuilder, Validators , ReactiveFormsModule } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { ActionSheetController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { File , FileEntry } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Storage } from '@ionic/storage';
import { FilePath } from '@ionic-native/file-path/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { ThisReceiver } from '@angular/compiler';

import { Geolocation } from '@ionic-native/geolocation/ngx';

import { StorageServiceService } from "../../providers/storage-service.service";


const STORAGE_KEY = 'my_images';

@Component({
  selector: 'app-addvisite',
  templateUrl: './addvisite.page.html',
  styleUrls: ['./addvisite.page.scss'],
})
export class AddvisitePage implements OnInit {

  

  ionicForm : FormGroup;
  isSubmitted;
  monuments;
  public imageURI:any;
  public imageFileName:any;
  fileentry: File;
  fileInputLabel: string;
  longitude:any;
  latitude:any;

  constructor(public formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private fm : ReactiveFormsModule,
    private camera: Camera, private file: File, private webview: WebView,
    private actionSheetController: ActionSheetController, private toastController: ToastController,
    private storage: Storage, private plt: Platform, private loadingController: LoadingController,
    private ref: ChangeDetectorRef, private filePath: FilePath, private transfer: FileTransfer,
    private fb :FormBuilder, private geo : Geolocation, private userStorage : StorageServiceService) {


      this.http.get('http://localhost:3000/mobile/monuments').subscribe(data => {
      this.monuments = data;

      this.geo.getCurrentPosition().then((resp) => {
        console.log(resp.coords.latitude);
        this.latitude = resp.coords.latitude;
        console.log(resp.coords.longitude);
        this.longitude = resp.coords.longitude;
       }).catch((error) => {
         console.log('Error getting location', error);
       });

      this.ionicForm = this.fb.group({
        monument : [''],
        pic : [null]
      })
    })
     }

  ngOnInit() {

    this.ionicForm = this.formBuilder.group({
      uploadedImage: [''],
      monument: ['', [Validators.required, Validators.minLength(2)]]
    })
  }

  onFileSelect(event) {
    this.fileentry = event.target.files[0];
    this.fileInputLabel = event.target.files[0] ;
    this.ionicForm.get('uploadedImage').setValue(this.fileentry);
    console.log(this.fileentry, JSON.stringify(this.fileentry));
  }

  async onFormSubmit() {

    if (!this.ionicForm.get('uploadedImage').value) {
      alert('Please fill valid details!');
      return false;
    }

    const formData = new FormData();
    formData.append('pic', JSON.stringify(this.fileentry));

    

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','multipart/form-data');
    headers.append('content-type','multipart/form-data');

    // let Object = {} ;

    // for(const property  in this.ionicForm.value.uploadedImage){
    //   Object[property] = this.ionicForm.value.uploadedImage[property];
    // }

    var newObject  = {
      'lastModified'     : this.ionicForm.value.uploadedImage.lastModified,
      'lastModifiedDate' : this.ionicForm.value.uploadedImage.lastModifiedDate,
      'name'             : this.ionicForm.value.uploadedImage.name,
      'size'             : this.ionicForm.value.uploadedImage.size,
      'type'             : this.ionicForm.value.uploadedImage.type
   }; 

    console.log(JSON.stringify(newObject));


    this.http
      .post<any>('http://localhost:3000/mobile/addvisites/', { pic : this.fileentry } , {headers : headers}).subscribe((response) => {
        console.log(response);
        if (response.statusCode === 200) {
          // Reset the file input
          
          this.fileInputLabel = undefined;
        }
      }, er => {
        console.log(er);
        alert(er);
      });
  }

  
  get errorControl() {
    return this.ionicForm.controls;
  }

  
  getImage(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }
  
    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);
    });
  }


  onFileSelect1(event){
    this.fileentry = event.target.files[0];
    this.ionicForm.patchValue({
      pic: event.target.files[0]
    });
    this.ionicForm.get('pic').updateValueAndValidity()
  }


  public uploadFile() {
    if (!this.ionicForm.valid) {
      
      }else{
        
        
        const fileTransfer: FileTransferObject = this.transfer.create();
        var options: FileUploadOptions;
    
        options = {
          fileKey: 'attachment',
          fileName: 'image.png',
          mimeType: 'image/png',
          chunkedMode: false,
          params: {
            monument : this.ionicForm.value.monument,
            
          }
        }
        fileTransfer.upload(this.imageURI, 'http://localhost:3000/mobile/addvisites/', options)
          .then((data) => {
          console.log(JSON.stringify(data));
          this.ionicForm.reset();
        }, (err) => {
          console.log(err);
          if(err.code == 1){
          }
        });
      }
      return;
    }
    
  

  
  


  

  sendPostRequest(postData) {
    let YourHeaders = {'Content-Type':'application/json'};
    

    this.http.post("http://127.0.0.1:3000/customers", postData, {headers: YourHeaders})
      .subscribe(data => {
        console.log(data['_body']);
       }, error => {
        console.log(error);
      });
  }

  loadImageFromDevice(event){
    this.fileentry = event.target.files[0];
  }

  async uploadData(){




    

   

    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept','application/json');
    headers.append('content-type','application/json');

 
     

    // try{
    //   const response = await this.http.post('http://localhost:3000/mobile/addvisites/', form , { headers : headers }).subscribe((res) => {
    //     console.log(json);
    //   })

    // } catch(err){
    //   console.log(err);
    // }
  }


  async onFormSubmit1(value){
    // console.log(this.ionicForm.value)
    var headers = new HttpHeaders();
    headers.append('Access-Control-Allow-Origin' , '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');



    if(this.ionicForm.valid && this.latitude !== undefined && this.longitude !== undefined && value.pic){
      console.log(value.pic, value.pic.name, value.monument);
      // var formData: any = new FormData();
      // formData.append("monument", value.monument);
      // formData.append("pic", this.fileentry);
      // formData.append('longitude', this.longitude);
      // formData.append('latitude', this.latitude);
      // formData.append('user_id',  StorageServiceService.user_id ? StorageServiceService.user_id : 3);

      var myObj = {
              monument:  value.monument,
              pic:  this.fileentry,
              longitude : this.longitude,
              latitude : this.latitude,
              user_id :   StorageServiceService.user_id ? StorageServiceService.user_id : 3
      }
      await this.http
      .post<any>('http://localhost:3000/mobile/addvisite/', myObj , {headers : headers}).subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('visite');
        if (response.statusCode === 200) {
        }
      }, er => {
        console.log(er);
      });
      
    }
  }
}


