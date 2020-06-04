
import { Component } from '@angular/core'; ;
import { ActivatedRoute, Router } from '@angular/router'; 



@Component({
  templateUrl: 'welcome.html',
  styleUrls: ['welcome.scss']
 })
export class WelcomePage {
    
    tenant: string = "";
    location: string = "";
    
    constructor(private route: ActivatedRoute, private router: Router) {}
    
    goToTenantsPage() {
        let arrLoc: string[] = this.location.split(",");
        arrLoc[0] = arrLoc[0].trim();
        arrLoc[1] = arrLoc[1].trim();
        this.router.navigate(["/tenants"], {queryParams: {city: arrLoc[0], province: arrLoc[1]}});
    }
}