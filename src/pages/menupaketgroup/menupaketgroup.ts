
import {Component, ViewChild } from '@angular/core';
import {AddMenuPaket} from '../addmenupaket/addmenupaket'; 
import {MenuPaket} from '../menupaket/menupaket';  
import {UtilService} from '../../services/utilservice';

@Component({
  selector: 'menupaketgroup',
  templateUrl: 'menupaketgroup.html',
  styleUrls: ['menupaketgroup.scss']
 })
export class MenuPaketGroup {
    constructor(private utilService: UtilService) {
        
    }
    
    currentView: string = 'menupaket';
    
    @ViewChild("addMenuPaket") addMenuPaket: AddMenuPaket;
    @ViewChild("menuPaket") menuPaket: MenuPaket;
    
    public refreshData() {
        this.menuPaket.refreshData();
    }
    
    newMenuPaket() {
        this.addMenuPaket.setScheduledPackage(null);
        this.currentView = 'addmenupaket';
    }
    
    editMenuPaket(sp) {
        this.addMenuPaket.setScheduledPackage(sp);
        this.currentView = 'addmenupaket';
    }
    
    updateMenuPaket(sp) {
//        this.utilService.printObject("UPDATE SP: ", sp);
        this.menuPaket.updateObjects(sp);
        this.currentView = 'menupaket';
    }    
}