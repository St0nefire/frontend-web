
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; 
import { UtilService  } from '../../services/utilservice'; ;

@Component({
  selector: 'textlist',
  templateUrl: 'textlist.html',
  styleUrls: ['textlist.scss']
 })
export class TextListComponent {
    
    constructor(private utilService: UtilService) {
        
    }
    
    _objects: any[] = [];
        
    @Input()
    set objects(value: any[]) {
//        if(value) 
//            this._objects = this.utilService.cloneObject(value);
//        else
//            this._objects = [];
        if(value)
            this._objects = value;
        else
            this._objects = [];
    }
    
    getObjects() {
        return this._objects;
    }
        
    removeObject(obj) {
        var index = -1; ;
        
        for(var i = 0 ; i < this._objects.length; i++) {
            if(this._objects[i].id == obj.id) {
                index = i;
                break;
            }
        }
        
        if(index > -1) {
            this._objects.splice(index, 1);
        }
    }     
}  