
import {Component, ViewChild } from '@angular/core'; 
import {AddMasterMenu} from '../addmastermenu/addmastermenu'; 
import {MasterMenu} from '../mastermenu/mastermenu'; 
import { MasterMenuService  } from '../../services/mastermenuservice'; 
import { UtilService  } from '../../services/utilservice'; ;

@Component({
  selector: 'mastermenugroup',
  templateUrl: 'mastermenugroup.html',
  styleUrls: ['mastermenugroup.scss']
 })
export class MasterMenuGroup {
    
    constructor(public mmService: MasterMenuService, public utilService: UtilService) {
        
    }
    
    currentView: string = 'mastermenu';
    
    @ViewChild("addMasterMenu") addMasterMenu: AddMasterMenu;
    @ViewChild("masterMenu") masterMenu: MasterMenu;
    
    public refreshData() {
        this.masterMenu.refreshData();
    }
    
    newMasterMenu(mm) {
        this.addMasterMenu.setMasterMenu(null);
        this.currentView = 'addmastermenu';
    }
    
    editMasterMenu(mm) {
        this.addMasterMenu.setMasterMenu(mm);
        this.currentView = 'addmastermenu';
    }
    
    updateMasterMenus(mm) {
        this.masterMenu.updateMasterMenus(mm);
        this.currentView = 'mastermenu';
    }    
}