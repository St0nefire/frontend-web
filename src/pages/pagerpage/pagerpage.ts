
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; 
import { MasterMenuService  } from '../../services/mastermenuservice'; ;
import { UtilService  } from '../../services/utilservice'; 
import { AddMenuDialog  } from '../../dialog/addmenu'; 


export class PagerPage {
    
    constructor(protected utilService: UtilService, pageTotal: number) {
        this.arrPageNum = [];
        this.pageTotal = pageTotal;
        for(let i=0; i<pageTotal; i++) {
            this.arrPageNum.push({value:0});
        }
    }
    
    pageTotal: number;
    rowNumber: number = 5;
    arrOriginObjects: any[] = []
    arrAllObjects: any[][] = []
    listObjects: any[] = [];   
    currentPageNum: number = 1;
    arrPageNum: any[] = [{value: 0},{value: 0},{value: 0},{value: 0},{value: 0}];
    
    @Output()
    addButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    editButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    makeObjectPages(menuArray: any[]) {
        for (i = 0; i < this.pageTotal ; i++) {
            this.arrPageNum[i].value = 0;
        }
        
        if (menuArray && menuArray.length > 0) {
            this.arrAllObjects = [];
            var arrObjects ;
            var i;
            for(i = 1; i <= menuArray.length; i++) {
                if ((i % this.pageTotal) == 1) {
                    arrObjects = [];
                }
                menuArray[i-1].index = i;
                arrObjects.push(menuArray[i-1]);

                if ((i % this.pageTotal) == 0) {
                    this.arrAllObjects.push(arrObjects);
                }
            }
            if ((i - 1) % this.pageTotal != 0)
                this.arrAllObjects.push(arrObjects);
                
            for (i = 0; (i < this.arrAllObjects.length && i < this.pageTotal ); i++) {
                this.arrPageNum[i].value = i + 1;
            }
            this.listObjects = this.arrAllObjects[0];
            if (!this.listObjects)
                this.listObjects = [];
            this.currentPageNum = 1;
        }
        else {
            this.arrAllObjects = [];
            this.listObjects = [];
        }
    }
    
    
    getRowNumber() {
        return new Array(this.pageTotal);
    }
    
    signalAddButtonClicked() {
        this.addButtonClicked.emit();
    }
    
    signalEditButtonClicked(mm) {
        this.editButtonClicked.emit(mm);
    }
        
    filter(inputSearch) {
        if(inputSearch.value) {
            let filteredObjects = this.arrOriginObjects.filter( mm => {
                return mm.name.toLowerCase().indexOf(inputSearch.value.toLowerCase()) >= 0 ;
            })
            
            this.makeObjectPages(filteredObjects.length > 0 ? filteredObjects : null);
        }
        else {
            var str: String;
            this.makeObjectPages(this.arrOriginObjects);
        }
    }
    
    goToPage(pageNum) {
        this.currentPageNum = pageNum;
        this.listObjects = this.arrAllObjects[pageNum - 1];
  
        let maxPageLength = this.arrAllObjects.length >= this.pageTotal ? this.pageTotal : this.arrAllObjects.length;
        let pageLeft = this.arrAllObjects.length - pageNum;
        let pageNumPosition = pageLeft > this.pageTotal - 1 ? 0 : maxPageLength - (pageLeft + 1);
        this.arrPageNum[pageNumPosition].value = pageNum;        
        for(var pos = pageNumPosition - 1, i = 1; pos >= 0; pos--, i++) {
            this.arrPageNum[pos].value= pageNum - i ;
        }
        
        for(var pos = pageNumPosition + 1, i = 1; pos < maxPageLength; pos++, i++) {
            this.arrPageNum[pos].value= pageNum + i ;
        }
    }
    
    goToPreviousPage() {
        this.goToPage(this.currentPageNum - 1);
    }
    
    goToNextPage() {
        this.goToPage(this.currentPageNum + 1);
    }
    
    getTotalObjects() {
        let length = this.arrAllObjects.length;
        if(length > 0) {
            let lastValueLength = (this.arrAllObjects[length - 1].length);
            return (this.pageTotal * length) - (this.pageTotal - lastValueLength);
        }
        else
            return 0;
    }
    
    getTotalObjectsInCurrentPage() {
        return this.listObjects.length;
    }
    
    updateObjects(newObj) {

        if((!newObj) || (!newObj.id))
            return;
            
        var filteredMenu ;
        
        filteredMenu = this.arrOriginObjects ? this.arrOriginObjects.filter(obj => obj.id == newObj.id ) : [];

        if(filteredMenu && filteredMenu.length <= 0) {
            this.arrOriginObjects.push(newObj);
            this.makeObjectPages(this.arrOriginObjects);
        }
        else {
            var index = -1;
            for (var i = 0; i < this.arrOriginObjects.length; i++) {
                if (this.arrOriginObjects[i].id == newObj.id) {
                    this.arrOriginObjects[i] = newObj;
                    this.makeObjectPages(this.arrOriginObjects);
                }
            }
        } 
    }
    
    removeFromObjects(obj) {
        let index = this.arrOriginObjects.indexOf(obj);
        if(index >= 0) {
            this.arrOriginObjects.splice(index, 1);
            this.makeObjectPages(this.arrOriginObjects);
        }
    }
    
    getStyleFor(index) {
        if(index == -1) {
            if (!(this.currentPageNum > 1))
                return {"visibility": "hidden"}
        }
        else if (index == this.pageTotal) {
            if (!((this.arrAllObjects.length - this.currentPageNum) > 0))
                return {"visibility": "hidden"};
        }
        else {
            if (this.currentPageNum == this.arrPageNum[index].value) {
                return {"background-color": "blue", "color": "white"}
            }
            else
                return {"background-color": "white", "color": "black"}
        }
    }
 }