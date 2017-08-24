
import { Component } from '@angular/core'; ;
import { CredService } from '../../services/credservice' ;
import { Router } from '@angular/router'; 

 @Component({
  templateUrl: 'login.html',
  styleUrls: ['login.scss']
 })
export class LoginPage {
    constructor(private credService: CredService, private router: Router) {}
    
    email: string;
    password: string;
    
    login() {
        let obs = this.credService.login(this.email, this.password);
        obs.subscribe(
            data => {
                if(data.errorMessage) {
                    alert("ERROR RESPONSE: " + data.errorMessage);
                    return;
                }
                
                this.router.navigate(['/home']);
            },
            error => {
                alert("ERROR: " + error);
            }
        )
    }
}