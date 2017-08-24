
import { Component, ViewChild } from '@angular/core'; ;
import { MasterMenuService  } from '../../services/mastermenuservice'; 
import { MenuIndividualService  } from '../../services/menuindividualservice';
import { ScheduledPackageService  } from '../../services/scheduledpackageservice'; 
import { UtilService  } from '../../services/utilservice';
import { TagService  } from '../../services/tagservice';

import { MasterMenuGroup } from '../mastermenugroup/mastermenugroup'
import { MenuIndividualGroup } from '../menuindividualgroup/menuindividualgroup'
import { MenuPaketGroup } from '../menupaketgroup/menupaketgroup'

@Component({
  templateUrl: 'home.html',
  styleUrls: ['home.scss']
 })
export class HomePage {
    
    constructor(private mmService: MasterMenuService, private miService: MenuIndividualService, private spService: ScheduledPackageService, private utilService: UtilService, private tagService: TagService) {
//        console.log(" NUMBER OF DAYS: " + (new Date((new Date()).getFullYear(), (new Date()).getMonth() + 1, 0)).getDate());
        setTimeout(() => {
            let obs = this.mmService.getMasterMenus();
            obs.subscribe(
                data => {
                    if(data.errorMessage) {
                        alert("ERROR RESPONSE: " + data.errorMessage);
                        return;
                    }                    
                },
                error => {
                    alert("ERROR: " + error);
                }
            )
            
            let obs2 = this.spService.getScheduledPackages();
            obs2.subscribe(
                data => {
                    if(data.errorMessage) {
                        alert("ERROR RESPONSE: " + data.errorMessage);
                        return;
                    }
                },
                error => {
                    alert("ERROR: " + error);
                }
            )


            let obs3 = this.miService.getMenuIndividuals();
            obs3.subscribe(
                data => {
                    if(data.errorMessage) {
                        alert("ERROR RESPONSE: " + data.errorMessage);
                        return;
                    }
                },
                error => {
                    alert("ERROR: " + error);
                }
            )
            
            let obs4 = this.tagService.getTags();
            obs4.subscribe(
                data => {
                    if(data.errorMessage) {
                        alert("ERROR RESPONSE: " + data.errorMessage);
                        return;
                    }
                },
                error => {
                    alert("ERROR: " + error);
                }
            )
        }, 1500);
    }
    
    currentView: string = 'mastermenu';
    mmReady: boolean = false;
    miReady: boolean = false;
    spReady: boolean = false;
    tagReady: boolean = false;
    
    @ViewChild("mmGroup") mmGroup: MasterMenuGroup;
    @ViewChild("miGroup") miGroup: MenuIndividualGroup;
    @ViewChild("mpGroup") mpGroup: MenuPaketGroup;
    
    goToMasterMenu() {
        this.currentView = 'mastermenu';
    }
    
    goToMenuPaket() {
        this.currentView = 'menupaket';
    }
    
    goToMenuIndividual() {
        this.currentView = 'menuindividual';
    }
    
    isLoading() {        
        // pastikan hanya me refesh data sekali saja ketika data datang untuk pertama kali karena method ini dipanggil
        // otomatis berkali-kali oleh anngular
        
        if (!this.tagService.loaded) {
            return true;
        }
        
        if (this.mmService.loaded) {
            if(!this.mmReady) {
                this.mmReady = true;
                this.mmGroup.refreshData();
            }
        }
        else
            return true;
        
        if (this.spService.loaded) {
            if(!this.spReady) {
                this.spReady = true;
                this.mpGroup.refreshData();
            }
        }
        else
            return true;
            
        if (this.miService.loaded) {
            if (!this.miReady) {
                this.miReady = true;
                this.miGroup.refreshData();
            }
        }
        else
            return true;
        
//        else
//            return true;
        
        return false;
    }
 }