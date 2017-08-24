
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; 
import { MenuIndividualService  } from '../../services/menuindividualservice'; 
import { CredService  } from '../../services/credservice'; 
import { UtilService  } from '../../services/utilservice'; 

@Component({
  selector: 'menuindividual',
  templateUrl: 'menuindividual.html',
  styleUrls: ['menuindividual.scss']
 })
export class MenuIndividual {
    
    constructor(private miService: MenuIndividualService, private utilService: UtilService, private credService: CredService) {
        this.refreshData(); 
    }
    
    rowNumber: number = 3;
    arrOriginMenuIndividual: any[];
    arrAllMenuIndividual: any[][] ;
    listMenuIndividual: any[];
    currentPageNum: number = 1;
    arrPageNum: any[] = [{value: 0},{value: 0},{value: 0}];
    pageNum1: number = 0;
    pageNum2: number = 0;
    pageNum3: number = 0;
    
    @Output()
    addButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    editButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    public refreshData() {
//        setTimeout(() => {
//            let obs = this.miService.getMenuIndividuals();
//            obs.subscribe(
//                data => {
//                    this.loading = false;
//                    if(data.errorMessage) {
//                        alert("ERROR RESPONSE: " + data.errorMessage);
//                        return;
//                    }
//                    if(data.menuIndividualList) {
//                        this.utilservice.printObject("MI LIST: " , data.menuIndividualList);
//                        this.arrOriginMenuIndividual = data.menuIndividualList;
//                        this.makeMenuPages(this.arrOriginMenuIndividual);
//                    }
//                },
//                error => {
//                    this.loading = false;
//                    alert("ERROR: " + error);
//                }
//            )
//        }, 3000 );
        this.arrOriginMenuIndividual = this.utilService.cloneObject(this.miService.miList);
        this.makeMenuPages(this.arrOriginMenuIndividual);
    }
    
    public getImageURL(image: string) {
        let imageURL = this.credService.getImageURL(image);
        return imageURL;
    }
    
    private makeMenuPages(menuArray: any[]) {
        
        for (i = 0; i < this.arrPageNum.length ; i++) {
            this.arrPageNum[i].value = 0;
        }
        
        if (menuArray) {
            this.arrAllMenuIndividual = [];
            var arrMasterMenu ;
            var i;
            for(i = 1; i <= menuArray.length; i++) {
                if((i % this.arrPageNum.length) == 1) {
                    arrMasterMenu = [];
                }
                menuArray[i-1].index = i;
                arrMasterMenu.push(menuArray[i-1]);

                if ((i % this.arrPageNum.length) == 0) {
                    this.arrAllMenuIndividual.push(arrMasterMenu);
                }
            }
            if((i-1) % this.arrPageNum.length != 0)
                this.arrAllMenuIndividual.push(arrMasterMenu);
                
            for (i = 0; (i < this.arrAllMenuIndividual.length && i < this.arrPageNum.length ); i++) {
                this.arrPageNum[i].value = i + 1;
            }
            this.listMenuIndividual = this.arrAllMenuIndividual[0];
            this.currentPageNum = 1;
        }
        else {
            this.arrAllMenuIndividual = null;
            this.listMenuIndividual = null;
        }
    }
            
    getRowNumber() {
        return new Array(this.rowNumber);
    }
    
    signalAddButtonClicked() {
        this.addButtonClicked.emit();
    }
    
    signalEditButtonClicked(sp) {
        this.editButtonClicked.emit(sp);
    }
    
    goToPage(pageNum) {
        this.currentPageNum = pageNum;
        this.listMenuIndividual = this.arrAllMenuIndividual[pageNum - 1];
  
        let maxPageLength = this.arrAllMenuIndividual.length >= this.arrPageNum.length ? this.arrPageNum.length : this.arrAllMenuIndividual.length;
        let pageLeft = this.arrAllMenuIndividual.length - pageNum;
        let pageNumPosition = pageLeft > (this.arrPageNum.length - 1) ? 0 : maxPageLength - (pageLeft + 1);
        this.arrPageNum[pageNumPosition].value = pageNum;        
        for(var pos = pageNumPosition - 1, i = 1; pos >= 0; pos--, i++) {
            this.arrPageNum[pos].value= pageNum - i ;
        }
        
        for(var pos = pageNumPosition + 1, i = 1; pos < maxPageLength; pos++, i++) {
            this.arrPageNum[pos].value= pageNum + i ;
        }
    }
    
    getStyleFor(index) {
        
        if(index == -1) {
            if (!(this.currentPageNum > 1))
                return {"visibility": "hidden"}
        }
        else if(index == 3) {
            if (this.arrAllMenuIndividual) {
                if (!((this.arrAllMenuIndividual.length - this.currentPageNum) > 0))
                return {"visibility": "hidden"};
            }
            else
                return {"visibility": "hidden"};
        }
        else {
            if (this.listMenuIndividual) {
                if (this.currentPageNum == this.arrPageNum[index].value) {
                    return {"background-color": "blue", "color": "white"}
                }
                else
                    return {"background-color": "initial", "color": "initial"}
            }
            else 
                return {"background-color": "initial", "color": "initial"};
        }
    }
    
    goToPreviousPage() {
        this.goToPage(this.currentPageNum - 1);
    }
    
    goToNextPage() {
        this.goToPage(this.currentPageNum + 1);
    }
    
    getTotalMenuIndividual() {
        if (this.arrAllMenuIndividual) {
            let length = this.arrAllMenuIndividual.length;
            let lastValueLength = (this.arrAllMenuIndividual[length - 1].length);
            return (this.arrPageNum.length * length) - (this.arrPageNum.length - lastValueLength);
        }
        else
            return 0;
    }
    
    getTotatMenuInCurrentPage() {
        if (this.listMenuIndividual) {
            return this.listMenuIndividual.length;
        }
        
        return 0;
    }
    
    updateMenuIndividual(newMI) {
        if((!newMI) || (!newMI.id))
            return;
            
        var filteredMenu ;
        if (this.arrOriginMenuIndividual) {
            filteredMenu = this.arrOriginMenuIndividual ? this.arrOriginMenuIndividual.filter(mi => mi.id == newMI.id ) : [];
        }
        else {
            filteredMenu = [];
        }
        if(filteredMenu.length <= 0) {
            if (!this.arrOriginMenuIndividual)
                this.arrOriginMenuIndividual = [];
                
            this.arrOriginMenuIndividual.push(newMI);
            this.makeMenuPages(this.arrOriginMenuIndividual);
        }
        else {
            var index = -1;
            for (var i = 0; i < this.arrOriginMenuIndividual.length; i++) {
                if (this.arrOriginMenuIndividual[i].id == newMI.id) {
                    this.arrOriginMenuIndividual[i] = newMI;
                    this.makeMenuPages(this.arrOriginMenuIndividual);
                }
            }
        } 
    }
    
    removefromMenuIndividual(mi) {
        let index = this.arrOriginMenuIndividual.indexOf(mi);
        if(index >= 0) {
            this.arrOriginMenuIndividual.splice(index, 1);
            this.makeMenuPages(this.arrOriginMenuIndividual);
        }
    }
    
    deleteMenuIndividual(mi) {
        let obs = this.miService.deleteMenuIndividual(mi.id);
            
        obs.subscribe(
            data => {
                if(data.errorMessage) {
                    alert("ERROR RESPONSE: " + data.errorMessage);
                    return;
                }
                this.removefromMenuIndividual(mi);
            },
            error => {
                alert("ERROR: " + error);
            }
        )
    }
 }