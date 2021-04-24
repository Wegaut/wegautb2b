import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { NotificationService } from '../notification.service';
import { Storage } from '@ionic/storage';
import { ModalController, NavController } from '@ionic/angular';
import { ContactSchema } from 'src/app/models/contact';
import { UserSchema } from 'src/app/models/user-model';
import {Router, ActivatedRoute, Params} from '@angular/router';


@Component({
  selector: 'app-modal-notification-detail',
  templateUrl: './modal-notification-detail.page.html',
  styleUrls: ['./modal-notification-detail.page.scss'],
  providers :[NotificationService,LoginService ]
})
export class ModalNotificationDetailPage implements OnInit {

  // VER CURSO 232//

  public user : UserSchema;
  public identity 
  public token;
  public status:string;
  public contacts : ContactSchema
  public userId ;

 


  constructor(
    private notificationService: NotificationService,
    private storage: Storage,
    private navCtrl: NavController,
    private modalCrtl: ModalController,
    private loginservice:LoginService,
    private _router :Router,
    private _route :ActivatedRoute
    ) { 

      this.identity=this.loginservice.getIdentity();
      this.token=this.loginservice.getToken();
      this.contacts = new ContactSchema();
      
    }

  ngOnInit():void {
    
    }
  
  addContact(form){
  
    var email = this.contacts.email;
    
//this._router.navigate(['/main/tabs/notification']);
  console.log(email);
  console.log("antes del servicio");
    this.notificationService.getContacsBeforeAdd(this.token,email).subscribe(
      response=>{
      console.log(response);
      console.log("mira marico aqui entramos wn qlq");
      console.log(this.contacts.email);
 
      if(response = null){
        alert(" el usuario no existe");
          }else{
              this.userId =this.identity.id;
              this.notificationService.postGroup(this.token,this.contacts, this.identity._id).subscribe(
                response=>{

                    console.log(response);
                    this._router.navigate(['/main/tabs/notification']);
                    if(response.contacts){
                      this.status="success";
                      this.contacts = response.contacts;
                      console.log("aqui no esta entreando");
                    }else{
                      this.status="error";
                      console.log("aqui tampoco");
                    }
              },

                error=>{
                  this.status="error";
                  console.log(error);
                  
                  });
               
              }
            });     
      }
}


