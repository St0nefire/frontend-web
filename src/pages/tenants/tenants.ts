
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; 
import { TenantService  } from '../../services/tenantservice'; ;
import { MasterMenuService  } from '../../services/mastermenuservice'; 
import { ScheduledPackageService  } from '../../services/scheduledpackageservice'; 
import { MenuIndividualService  } from '../../services/menuindividualservice'; ;
import { UtilService  } from '../../services/utilservice'; 
import { CredService  } from '../../services/credservice'; 
import { AddMenuDialog  } from '../../dialog/addmenu'; 
import { PagerPage  } from '../pagerpage/pagerpage'; 
import { ActivatedRoute, Router } from '@angular/router'; 

@Component({
  selector: 'tenants',
  templateUrl: 'tenants.html',
  styleUrls: ['tenants.scss']
 })
export class TenantsPage extends PagerPage {
    
    loading: boolean = false;
    isError: boolean = false;
    mainView: string = "tenantlist";
    tenantView: string = "menu";
    currentTenant: any = null;
    province: string = "";
    city: string = "";
    
    constructor(private mmService: MasterMenuService, private spService: ScheduledPackageService, private miService: MenuIndividualService, 
                protected utilService: UtilService, protected tenantService: TenantService, private credService: CredService,
                private route: ActivatedRoute, private router: Router) {
        super(utilService, 9);
        this.utilService.setBackgroundColor("lightsteelblue");
    }
    
    ngOnInit() {
        this.route
          .queryParams
          .subscribe(
              params => {
                this.loading = true;
                setTimeout(
                    ()=> {
                        this.province = params["province"];
                        this.city = params["city"];
                        this.tenantService.getTenants(this.province, this.city)
                            .subscribe(
                                  data => {
                                      this.refreshData(data);
                                  },
                                  error => {
                                      this.isError = true;
                                      console.log("ERROR: " + error);
                                  },
                                  () => {
                                      this.loading = false;
                                  }
                            )
                    }, 1500
                )
            });
    }
    
    ngOnDestroy() {
        this.utilService.setBackgroundColor("white");
    }
    
    showScheduledPackage(tenant) {
        this.mainView = "menulist";
        this.tenantView = "menu";
        this.refreshData(null);
        
        if (!this.mmService.tenantMmList.has(tenant.id)) {
            this.loading = true;
            setTimeout(
                () => {
                    this.mmService.getMasterMenusByTenant(tenant)
                        .subscribe(
                            data => {
                                this.getScheduledPackage(tenant);
                            },
                            error => {
                                this.isError = true;
                                console.log("ERROR: " + error);
                            }
                        )
                }, 1500
            );
        }
        else {
            this.getScheduledPackage(tenant);
        }
    }
    
    showMenuIndividual(tenant) {
        this.mainView = "menulist";
        this.tenantView = "menu";
        this.refreshData(null);
        
        if (!this.mmService.tenantMmList.has(tenant.id)) {
            this.loading = true;
            setTimeout(
                () => {
                    this.mmService.getMasterMenusByTenant(tenant)
                        .subscribe(
                            data => {
                                this.getMenuIndividuals(tenant);
                            },
                            error => {
                                this.isError = true;
                                console.log("ERROR: " + error);
                            }
                        )
                }, 1500
            );
        }
        else {
            this.getMenuIndividuals(tenant);
        }
    }
    
    showTenantList() {
        this.mainView = "tenantlist";
        this.refreshData(this.tenantService.tenantsList.get(this.province + this.city));
    }
    
    
    public refreshData(list) {
        if(list && list.length > 0) 
            this.arrOriginObjects = this.utilService.cloneObject(list);
        else 
            this.arrOriginObjects = [];

        this.makeObjectPages(this.arrOriginObjects);
    }
    
    public getTenantImageURL(tenantId: string, image: string) {
        let imageURL = this.credService.getTenantImageURL(tenantId, image);
        return imageURL;
    }
    
    public isLoading() {
        if (this.isError)
            return false;
        
        return this.loading;
    }
    
    private getScheduledPackage(tenant) {
        if (this.spService.tenantSpList.has(tenant.id)) {
            this.refreshData(this.spService.tenantSpList.get(tenant.id));
            this.loading = false;
        }
        else {
            this.loading = true;
            this.refreshData(null);
            setTimeout(
                () => {
                    this.spService.getScheduledPackagesByTenant(tenant)
                        .subscribe(
                            data => {
                                this.refreshData(data);
                            },
                            error => {
                                this.isError = true;
                                console.log("ERROR: " + error);
                            },
                            () => {
                                this.loading = false;
                            }
                        )
                }, 1500
            );
        }
    }
    
    private getMenuIndividuals(tenant) {
        if (this.miService.tenantMmList.has(tenant.id)) {
            this.refreshData(this.miService.tenantMmList.get(tenant.id));
            this.loading = false;
        }
        else {
            this.loading = true;
            this.refreshData(null);
            setTimeout(
                () => {
                    this.miService.getMenuIndividualsByTenant(tenant)
                        .subscribe(
                            data => {
                                this.refreshData(data);
                            },
                            error => {
                                this.isError = true;
                                console.log("ERROR: " + error);
                            },
                            () => {
                                this.loading = false;
                            }
                        )
                }, 1500
            );
        }
    }
 }