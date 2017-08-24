
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; 
import { ScheduledPackageService  } from '../../services/scheduledpackageservice'; 
import { CredService  } from '../../services/credservice'; 
import { UtilService  } from '../../services/utilservice'; 
import { PagerPage  } from '../pagerpage/pagerpage'; 
//@Component({
//  selector: 'menupaket',
//  templateUrl: 'menupaket.html',
//  styleUrls: ['menupaket.scss']
// })
//export class MenuPaket {
//    
//    constructor(private spService: ScheduledPackageService, private utilService: UtilService, private credService: CredService) {
////        this.refreshData(); 
//    }
//    
//    rowNumber: number = 3;
//    arrOriginMenuPaket: any[] = [];
//    arrAllMenuPaket: any[][] = [];
//    listMenuPaket: any[] = [];
//    currentPageNum: number = 1;
//    arrPageNum: any[] = [{value: 0},{value: 0},{value: 0}];
//    pageNum1: number = 0;
//    pageNum2: number = 0;
//    pageNum3: number = 0;
//    isLoading: boolean = false;
//    
//    @Output()
//    addButtonClicked: EventEmitter<any> = new EventEmitter<any>();
//    
//    @Output()
//    editButtonClicked: EventEmitter<any> = new EventEmitter<any>();
//                
//    public refreshData() {
//        this.arrOriginMenuPaket = this.utilService.cloneObject(this.spService.spList);
//        if (!this.arrOriginMenuPaket)
//            this.arrOriginMenuPaket = [];
//        this.makeMenuPages(this.arrOriginMenuPaket);
//    }
//    
//    public getImageURL(image: string) {
//        let imageURL = this.credService.getImageURL(image);
//        return imageURL;
//    }
//    
//    private makeMenuPages(menuArray: any[]) {
//        
//        for (i = 0; i < this.arrPageNum.length ; i++) {
//            this.arrPageNum[i].value = 0;
//        }
//        
//        if (menuArray) {
//            this.arrAllMenuPaket = [];
//            var arrMasterMenu ;
//            var i;
//            for(i = 1; i <= menuArray.length; i++) {
//                if((i % this.arrPageNum.length) == 1) {
//                    arrMasterMenu = [];
//                }
//                menuArray[i-1].index = i;
//                arrMasterMenu.push(menuArray[i-1]);
//
//                if ((i % this.arrPageNum.length) == 0) {
//                    this.arrAllMenuPaket.push(arrMasterMenu);
//                }
//            }
//            if((i-1) % this.arrPageNum.length != 0)
//                this.arrAllMenuPaket.push(arrMasterMenu);
//                
//            for (i = 0; (i < this.arrAllMenuPaket.length && i < this.arrPageNum.length ); i++) {
//                this.arrPageNum[i].value = i + 1;
//            }
//            this.listMenuPaket = this.arrAllMenuPaket[0];
//            this.currentPageNum = 1;
//        }
//        else {
//            this.arrAllMenuPaket = [];
//            this.listMenuPaket = [];
//        }
//    }
//    
//    getRowNumber() {
//        return new Array(this.rowNumber);
//    }
//    
//    signalAddButtonClicked() {
//        this.addButtonClicked.emit();
//    }
//    
//    signalEditButtonClicked(sp) {
//        this.editButtonClicked.emit(sp);
//    }
//    
//    
//    goToPage(pageNum) {
//        this.currentPageNum = pageNum;
//        this.listMenuPaket = this.arrAllMenuPaket[pageNum - 1];
//  
//        let maxPageLength = this.arrAllMenuPaket.length >= this.arrPageNum.length ? this.arrPageNum.length : this.arrAllMenuPaket.length;
//        let pageLeft = this.arrAllMenuPaket.length - pageNum;
//        let pageNumPosition = pageLeft > (this.arrPageNum.length - 1) ? 0 : maxPageLength - (pageLeft + 1);
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
//        if(index == -1) {
//            if (!(this.currentPageNum > 1))
//                return {"visibility": "hidden"}
//        }
//        else if(index == 3) {
//            if (this.arrAllMenuPaket) {
//                if (!((this.arrAllMenuPaket.length - this.currentPageNum) > 0))
//                return {"visibility": "hidden"};
//            }
//            else
//                return {"visibility": "hidden"};
//        }
//        else {
//            if (this.listMenuPaket) {
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
//    getTotalMenuPaket() {
//        if (this.arrAllMenuPaket) {
//            let length = this.arrAllMenuPaket.length;
//            let lastValueLength = (this.arrAllMenuPaket[length - 1].length);
//            return (this.arrPageNum.length * length) - (this.arrPageNum.length - lastValueLength);
//        }
//        else
//            return 0;
//    }
//    
//    getTotatMenuInCurrentPage() {
//        if (this.listMenuPaket) {
//            return this.listMenuPaket.length;
//        }
//        
//        return 0;
//    }
//    
//    updateMenuPaket(newSP) {
//        if((!newSP) || (!newSP.id))
//            return;
//            
//        var filteredMenu ;
//        if (this.arrOriginMenuPaket) {
//            filteredMenu = this.arrOriginMenuPaket ? this.arrOriginMenuPaket.filter(sp => sp.id == newSP.id ) : [];
//        }
//        else {
//            filteredMenu = [];
//        }
//        if(filteredMenu.length <= 0) {
//            if (!this.arrOriginMenuPaket)
//                this.arrOriginMenuPaket = [];
//                
//            this.arrOriginMenuPaket.push(newSP);
//            this.makeMenuPages(this.arrOriginMenuPaket);
//        }
//        else {
//            var index = -1;
//            for (var i = 0; i < this.arrOriginMenuPaket.length; i++) {
//                if (this.arrOriginMenuPaket[i].id == newSP.id) {
//                    this.arrOriginMenuPaket[i] = newSP;
//                    this.makeMenuPages(this.arrOriginMenuPaket);
//                }
//            }
//        } 
//    }
//    
//    removefromMenuPaket(mm) {
//        let index = this.arrOriginMenuPaket.indexOf(mm);
//        if(index >= 0) {
//            this.arrOriginMenuPaket.splice(index, 1);
//            this.makeMenuPages(this.arrOriginMenuPaket);
//        }
//        
//    }
//    
//    deleteMenuPaket(sp) {
//        let obs = this.spService.deleteScheduledPackage(sp.id);
//        this.isLoading = true;
//        setTimeout(() => {
//            obs.subscribe(
//                data => {
//                    if(data.errorMessage) {
//                        alert("ERROR RESPONSE: " + data.errorMessage);
//                        return;
//                    }
//                    this.removefromMenuPaket(sp);
//                },
//                error => {
//                    alert("ERROR: " + error);
//                },
//                () => {
//                    this.isLoading = false; 
//                }
//           )
//        }, 1500);
//    }
// }

@Component({
  selector: 'menupaket',
  templateUrl: 'menupaket.html',
  styleUrls: ['menupaket.scss']
 })
export class MenuPaket extends PagerPage{
    
    constructor(private spService: ScheduledPackageService, protected utilService: UtilService, private credService: CredService) {
        super(utilService, 3);
    }
    
//    rowNumber: number = 3;
//    arrOriginMenuPaket: any[] = [];
//    arrAllMenuPaket: any[][] = [];
//    listMenuPaket: any[] = [];
//    currentPageNum: number = 1;
//    arrPageNum: any[] = [{value: 0},{value: 0},{value: 0}];
//    pageNum1: number = 0;
//    pageNum2: number = 0;
//    pageNum3: number = 0;
    isLoading: boolean = false;
    
    @Output()
    addButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    editButtonClicked: EventEmitter<any> = new EventEmitter<any>();
                
    public refreshData() {
        this.arrOriginObjects = this.utilService.cloneObject(this.spService.spList);
        if (!this.arrOriginObjects)
            this.arrOriginObjects = [];
        this.makeObjectPages(this.arrOriginObjects);
    }
    
    public getImageURL(image: string) {
        let imageURL = this.credService.getImageURL(image);
        return imageURL;
    }
        
    deleteMenuPaket(sp) {
        let obs = this.spService.deleteScheduledPackage(sp.id);
        this.isLoading = true;
        setTimeout(() => {
            obs.subscribe(
                data => {
                    if(data.errorMessage) {
                        alert("ERROR RESPONSE: " + data.errorMessage);
                        return;
                    }
                    this.removeFromObjects(sp);
                },
                error => {
                    alert("ERROR: " + error);
                },
                () => {
                    this.isLoading = false; 
                }
           )
        }, 1500);
    }
 }