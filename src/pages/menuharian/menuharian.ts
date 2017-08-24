
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; 
import { MasterMenuService  } from '../../services/mastermenuservice'; ;
import { UtilService  } from '../../services/utilservice'; 
import { AddMenuDialog  } from '../../dialog/addmenu'; 

@Component({
  selector: 'menuharian',
  templateUrl: 'menuharian.html',
  styleUrls: ['menuharian.scss']
 })
export class MenuHarian {
    
   constructor(private mmService: MasterMenuService, private utilService: UtilService) {
       this.initTable();
   }
   
   rowNumber = 6;
   colNumber = 6;
   maxIndex = 31;
   _menus: any[];
   showMenu: boolean = false;
   menuDate: number = 0;
   currentMenus: any[];
   table: any[][];
   
   @ViewChild("addMenuDlg") addMenuDlg: AddMenuDialog;

   @Input()
   set menus(value: any[]) {
//       let menus = this.utilService.cloneObject(value);
       this.initTable();
       if(value) {
//           for(var i=0; i < value.length; i++) {
//               this.getDateMenusFor(value[i].date).menus.push(this.mmService.findById(value[i].masterMenuId));
//           }
           
           for(var i=0; i < value.length; i++) {
               this.getDateMenusFor(value[i].date).menus.push(value[i].menu);
           }
       }
   }
   
   @Output()
   okButtonClicked: EventEmitter<any> = new EventEmitter();
    
   @Output()
   cancelButtonClicked: EventEmitter<any> = new EventEmitter();
   
   private initTable() {
       var index = 1;
       this.table = [];
       for (var r = 0; r < this.rowNumber; r++) {
           this.table.push([]);
           for (var c = 0; c < this.colNumber && index <= this.maxIndex; c++, index++) {
               this.table[r].push({date: index, menus: []});
           } 
       }
   }
   
   private getCurrentDateMenus() {       
       return this.getDateMenusFor(this.menuDate);
   }
   
   private getDateMenusFor(date) {
       var row = Math.floor(date / this.colNumber);
       var col = date % this.colNumber ;
       if (col == 0) {
            row -= 1;
            col = this.colNumber - 1;
       }
       else {
            col -= 1;
       }
       
       return this.table[row][col];
   }
   
   getMenus() {
       var index = 1;
       var retval = [];
       for (var r = 0; r < this.rowNumber; r++) {
           for (var c = 0; c < this.colNumber && index <= this.maxIndex; c++, index++) {
               let menus = this.table[r][c].menus;
               if(menus) {
                   for(var i = 0; i < menus.length; i++) {
//                       retval.push({date: index, masterMenuId: menus[i].id});
                       retval.push({date: index, menu: menus[i]});
                   }
               }
           }
       }
       
       return retval;
   }
   
   signalOkButtonClicked() {
       this.okButtonClicked.emit(this.getMenus());
       this.initTable();
   }
   
   signalCancelButtonClicked() {
       this.cancelButtonClicked.emit();
   }
   
   addMenu(date) {
       this.menuDate = date;
       this.currentMenus = this.getDateMenusFor(date).menus;
       this.showMenu = true;
   }
   
   handleAddedMenu(menus) {
       this.showMenu = false;
       let cdMenus = this.getCurrentDateMenus();
       cdMenus.menus = menus;
   }
   
   handleCanceledMenu() {
       this.showMenu = false;
   }   
 }