
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
        super(utilService);
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
        this.arrOriginMasterMenu = this.utilService.cloneObject(this.masterMenuService.mmList);
        this.makeMenuPages(this.arrOriginMasterMenu);
    }
    
    public getImageURL(image: string) {
        let imageURL = this.masterMenuService.getImageURL(image);
        return imageURL;
    }
    
//    private makeMenuPages(menuArray: any[]) {
//        
//        for (i = 0; i < 5 ; i++) {
//            this.arrPageNum[i].value = 0;
//        }
//        
//        if (menuArray) {
//            this.arrAllMasterMenu = [];
//            var arrMasterMenu ;
//            var i;
//            for(i = 1; i <= menuArray.length; i++) {
//                if((i % 5) == 1) {
//                    arrMasterMenu = [];
//                }
//                menuArray[i-1].index = i;
//                arrMasterMenu.push(menuArray[i-1]);
//
//                if((i % 5) == 0) {
//                    this.arrAllMasterMenu.push(arrMasterMenu);
//                }
//            }
//            if((i-1) % 5 != 0)
//                this.arrAllMasterMenu.push(arrMasterMenu);
//                
//            for (i = 0; (i < this.arrAllMasterMenu.length && i < 5 ); i++) {
//                this.arrPageNum[i].value = i + 1;
//            }
//            this.listMasterMenu = this.arrAllMasterMenu[0];
//            this.currentPageNum = 1;
//        }
//        else {
//            this.arrAllMasterMenu = null;
//            this.listMasterMenu = null;
//        }
//    }
//    
//    
//    getRowNumber() {
//        return new Array(this.rowNumber);
//    }
//    
//    signalAddButtonClicked() {
//        this.addButtonClicked.emit();
//    }
//    
//    signalEditButtonClicked(mm) {
//        this.editButtonClicked.emit(mm);
//    }
//        
//    filter(inputSearch) {
//        if(inputSearch.value) {
//            let filteredMenu = this.arrOriginMasterMenu.filter( mm => {
//                return mm.name.toLowerCase().indexOf(inputSearch.value.toLowerCase()) >= 0 ;
//            })
//            
//            this.makeMenuPages(filteredMenu.length > 0 ? filteredMenu : null);
//        }
//        else {
//            var str: String;
//            this.makeMenuPages(this.arrOriginMasterMenu);
//        }
//    }
//    
//    goToPage(pageNum) {
//        this.currentPageNum = pageNum;
//        this.listMasterMenu = this.arrAllMasterMenu[pageNum - 1];
//  
//        let maxPageLength = this.arrAllMasterMenu.length >= 5 ? 5 : this.arrAllMasterMenu.length;
//        let pageLeft = this.arrAllMasterMenu.length - pageNum;
//        let pageNumPosition = pageLeft > 4 ? 0 : maxPageLength - (pageLeft + 1);
//        this.arrPageNum[pageNumPosition].value = pageNum;        
//        for(var pos = pageNumPosition - 1, i = 1; pos >= 0; pos--, i++) {
//            this.arrPageNum[pos].value= pageNum - i ;
//        }
//        
//        for(var pos = pageNumPosition + 1, i = 1; pos < maxPageLength; pos++, i++) {
//            this.arrPageNum[pos].value= pageNum + i ;
//        }
//    }
//    
//    getStyleFor(index) {
//        
//        if(index == -1) {
//            if (!(this.currentPageNum > 1))
//                return {"visibility": "hidden"}
//        }
//        else if(index == 5) {
//            if (this.arrAllMasterMenu) {
//                if (!((this.arrAllMasterMenu.length - this.currentPageNum) > 0))
//                return {"visibility": "hidden"};
//            }
//            else
//                return {"visibility": "hidden"};
//        }
//        else {
//            if (this.listMasterMenu) {
//                if (this.currentPageNum == this.arrPageNum[index].value) {
//                    return {"background-color": "blue", "color": "white"}
//                }
//                else
//                    return {"background-color": "initial", "color": "initial"}
//            }
//            else 
//                return {"background-color": "initial", "color": "initial"};
//        }
//    }
//    
//    goToPreviousPage() {
//        this.goToPage(this.currentPageNum - 1);
//    }
//    
//    goToNextPage() {
//        this.goToPage(this.currentPageNum + 1);
//    }
//    
//    getTotalMasterMenu() {
//        if (this.arrAllMasterMenu) {
//            let length = this.arrAllMasterMenu.length;
//            let lastValueLength = (this.arrAllMasterMenu[length - 1].length);
//            return (5 * length) - (5 - lastValueLength);
//        }
//        else
//            return 0;
//    }
//    
//    getTotatMenuInCurrentPage() {
//        if (this.listMasterMenu) {
//            return this.listMasterMenu.length;
//        }
//        
//        return 0;
//    }
//    
//    updateMasterMenus(newMm) {
//
//        if((!newMm) || (!newMm.id))
//            return;
//            
//        var filteredMenu ;
//        if (this.arrOriginMasterMenu) {
//            filteredMenu = this.arrOriginMasterMenu ? this.arrOriginMasterMenu.filter(mm => mm.id == newMm.id ) : [];
//        }
//        else {
//            filteredMenu = [];
//        }
//        
//        if(filteredMenu && filteredMenu.length <= 0) {
//            if (!this.arrOriginMasterMenu)
//                this.arrOriginMasterMenu = [];
//                
//            this.arrOriginMasterMenu.push(newMm);
//            this.makeMenuPages(this.arrOriginMasterMenu);
//        }
//        else {
//            var index = -1;
//            for (var i = 0; i < this.arrOriginMasterMenu.length; i++) {
//                if (this.arrOriginMasterMenu[i].id == newMm.id) {
//                    this.arrOriginMasterMenu[i] = newMm;
//                    this.makeMenuPages(this.arrOriginMasterMenu);
//                }
//            }
//        } 
//    }
//    
//    removefromMasterMenu(mm) {
//        let index = this.arrOriginMasterMenu.indexOf(mm);
//        if(index >= 0) {
//            this.arrOriginMasterMenu.splice(index, 1);
//            this.makeMenuPages(this.arrOriginMasterMenu);
//        }
//    }
    
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
                    this.removefromMasterMenu(mm);
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
    
    
//    getActiveStyleForIndex(i: number) {
//        if (this.listMasterMenu) {
//            if (i >= this.listMasterMenu.length)
//                return;
//            
//            if (this.listMasterMenu[i].active)
//                return {"background-color": "green"};
//            else
//                return {"background-color": "pink"};
//        }
//           
//    }
 }