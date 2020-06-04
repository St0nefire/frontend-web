
import {Component, ViewChild } from '@angular/core';
import {AddMenuIndividual} from '../addmenuindividual/addmenuindividual'; 
import {MenuIndividual} from '../menuindividual/menuindividual';  
import {UtilService} from '../../services/utilservice';

@Component({
  selector: 'menuindividualgroup',
  templateUrl: 'menuindividualgroup.html',
  styleUrls: ['menuindividualgroup.scss']
 })
export class MenuIndividualGroup {
    
    constructor(private utilService: UtilService) {
        
    }
    
    currentView: string = 'menuindividual';
    
    @ViewChild("addMenuIndividual") addMenuIndividual: AddMenuIndividual;
    @ViewChild("menuIndividual") menuIndividual: MenuIndividual;
    
    public refreshData() {
        this.menuIndividual.refreshData();
    }
    
    newMenuIndividual(mi) {
        this.addMenuIndividual.setMenuIndividual(null);
        this.currentView = 'addmenuindividual';
    }
    
    editMenuIndividual(mi) {
//        this.utilService.printObject("EDIT MI: ", mi);
        this.addMenuIndividual.setMenuIndividual(mi);
        this.currentView = 'addmenuindividual';
    }
    
    updateMenuIndividual(mi) {
        this.menuIndividual.updateObjects(mi);
        this.currentView = 'menuindividual';
    }    
}

