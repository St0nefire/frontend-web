
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; 
import { UtilService  } from '../../services/utilservice'; ;


@Component({
  selector: 'autocomplete',
  templateUrl: 'autocomplete.html',
  styleUrls: ['autocomplete.scss']
 })
export class AutoCompleteComponent {
    
    constructor(private utilService: UtilService) {
        
    }
    
    private _objects: any[] = []
    private filteredObjects: any[] ;
    
    focused: boolean = false;
    _tags: any[] = [];
    
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
        this.refreshObjects(this.inputText.nativeElement.value);
    }
    
    @Input()
    set tags(value: any[]) {
//        if(value)
//            this._tags = this.utilService.cloneObject(value);
//        else
//            this._tags = [];
        if(value)
            this._tags = value;
        else 
            this._tags = [];
    }
    
    @ViewChild("inputText") inputText: any;
        
    public getTags() {
        return this._tags;
    }
    
    refreshObjects(value){
        if(value) {
            this.filteredObjects = this._objects.filter( obj => {
                return (obj.name.toLowerCase().indexOf(value.toLowerCase()) >= 0) || (obj.id <= 0) ;
            });    
        }
        else {
            this.filteredObjects = this._objects;
        }
    }  
    
    onFocus() {
        this.refreshObjects(this.inputText.nativeElement.value);
        this.focused = true;
    }
    
    
    pickTag(obj) {        
        if(obj.if <= 0)
            return;
        
        for(var i = 0; i < this._tags.length; i++) {
            if(this._tags[i].id == obj.id)
            return ;
        }
            
        this._tags.push(obj);
        this.inputText.nativeElement.value = null;
    }
    
    removeTag(obj) {
        let i = this._tags.indexOf(obj);
        if(i >= 0)
            this._tags.splice(i, 1);
    }
}  