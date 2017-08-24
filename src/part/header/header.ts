

import { Component, ElementRef } from '@angular/core'; 
import { CredService } from '../../services/credservice' ;
import { GlobalService } from '../../services/globalservice' ;
import { Router } from '@angular/router'; 

@Component({
  selector: 'header',
  host: {'(document:click)': 'handleClick($event)'},
  templateUrl: 'header.html',
  styleUrls: ['header.scss']
 })
export class HeaderPart {
    email: string;
    optionsStyle = {display: "none"};
    
    constructor(private credService: CredService, private gService: GlobalService, private element: ElementRef, private router: Router) 
    {
        this.email = this.credService.email;
    }
    
    logout() {
        this.credService.logout().subscribe(
            data => {
                if(data.errorMessage) {
                    console.log("ERROR RESPONSE: " + data.errorMessage);
                }
                
                
            },
            error => {
                console.log("ERROR: " + error);
            },
            () => {
                this.gService.reset();
                this.router.navigate(["/login"]);
            }
        )
    } 
       
    routerOnActivate() {
        this.email = this.credService.email;
    }
    
    toogleOptionsVisibility(event) {
        if (this.optionsStyle) {
            this.optionsStyle = null;
            event.stopPropagation();
        }
    }
    
    handleClick(event){
        if (!this.optionsStyle)
            this.optionsStyle = {display: "none"};
   }
}