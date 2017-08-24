
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; 
import { MasterMenuService  } from '../../services/mastermenuservice'; ;
import { UtilService  } from '../../services/utilservice'; 
import { AddMenuDialog  } from '../../dialog/addmenu'; 
import { PagerPage  } from '../pagerpage/pagerpage'; 

@Component({
  selector: 'mastermenu',
  templateUrl: 'mastermenu.html',
  styleUrls: ['mastermenu.scss']
 })
export class MasterMenu extends PagerPage {
    
    constructor(private masterMenuService: MasterMenuService, protected utilService: UtilService) {
        super(utilService, 5);
    }
    
//    rowNumber: number = 5;
//    arrOriginMasterMenu: any[];
//    arrAllMasterMenu: any[][] ;
//    listMasterMenu: any[];    
//    currentPageNum: number = 1;
//    arrPageNum: any[] = [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0}];
//    pageNum1: number = 0;
//    pageNum2: number = 0;
//    pageNum3: number = 0;
//    pageNum4: number = 0;
//    pageNum5: number = 0;
    
//    @ViewChild("inputSearch") inputSearch: any;
    
    isLoading: boolean = false;
    
    @Output()
    addButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    editButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    public refreshData() {
        this.arrOriginObjects = this.utilService.cloneObject(this.masterMenuService.mmList);
        if (!this.arrOriginObjects)
            this.arrOriginObjects = [];
        this.makeObjectPages(this.arrOriginObjects);
    }
    
    public getImageURL(image: string) {
        let imageURL = this.masterMenuService.getImageURL(image);
        return imageURL;
    }

    deleteMasterMenu(mm) {
        let obs = this.masterMenuService.deleteMasterMenu(mm.id);
        this.isLoading=true;   
        setTimeout(() => {
            obs.subscribe(
                data => {
                    if(data.errorMessage) {
                        alert("ERROR RESPONSE: " + data.errorMessage);
                        return;
                    }
                    this.removeFromObjects(mm);
                },
                error => {
                    alert("ERROR: " + error);
                },
                () => {
                    this.isLoading = false;
                }
        )}, 1500);
    }
    
    toogleActiveStatus(mm) {
        let obs = this.masterMenuService.editActiveStatus(mm.id, !mm.active);
        this.isLoading = true;
        setTimeout( () => {
            obs.subscribe(
                data => {
                    if(data.errorMessage) {
                        alert("ERROR RESPONSE: " + data.errorMessage);
                        return;
                    }
                    mm.active = !mm.active;
                },
                error => {
                    alert("ERROR: " + error);
                },
                () => {
                    this.isLoading = false;
                }
        )}, 1500);
    }
    
    
    
    
    getActiveStyleForIndex(i: number) {
        if (i >= this.listObjects.length)
            return;

        if (this.listObjects[i].active)
            return {"background-color": "green"};
        else
            return {"background-color": "pink"};           
    }
 }