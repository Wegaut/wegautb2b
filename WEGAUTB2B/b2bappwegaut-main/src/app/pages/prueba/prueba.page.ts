import { Component, OnInit } from '@angular/core';
import {GroupsSchema2} from '../../models/groupSchema';
import { UserSchema } from 'src/app/models/user-model';
import { LoginService } from '../login/login.service';
import { EventsService } from '../events/events.service';

@Component({
  selector: 'app-prueba',
  templateUrl: './prueba.page.html',
  styleUrls: ['./prueba.page.scss'],
  providers :[EventsService , LoginService ]
})
export class PruebaPage implements OnInit {

public identity;
public token;
public group: any= [];

  constructor(private eventService: EventsService,
              private loginservice:LoginService)
               {
this.identity=this.loginservice.getIdentity();
this.token=this.loginservice.getToken();

               }

  ngOnInit() {
    this.eventService.getGroupAll(this.token)
                      .subscribe(res => {
                        if(res){
                          this.group=res;
                          console.log(res)
                        }
                      },
                      error => {
                        console.log(error)
                      }
                    )
                  }                
    }

  /*  console.log(res.group[0].nameChat);  
                        console.log(res.group[0].messages[0]);  
                        console.log(res.group[0].groupMembers[0].name); 
                        
                        
                        
  getGroupAll(){
   // var groupId = this.identity._id;
    this.eventService.getGroupAll(this.token).subscribe(
      response=>{
        if(response.group){
          this.groups  = response.group;
          console.log(this.groups);
          console.log(this.groups);
          console.log("this getGroupAll");
        }
      },
      error => {
        console.log(error)
      }
    )
  }*/