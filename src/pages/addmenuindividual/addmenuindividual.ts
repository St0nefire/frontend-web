
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; ;
import { MenuIndividualService  } from '../../services/menuindividualservice';
import { CredService  } from '../../services/credservice';
import { TagService  } from '../../services/tagservice';
import { UtilService  } from '../../services/utilservice';
import { AutoCompleteComponent  } from '../../components/autocomplete/autocomplete';


@Component({
  selector: 'addmenuindividual',
  templateUrl: 'addmenuindividual.html',
  styleUrls: ['addmenuindividual.scss']
 })
export class AddMenuIndividual {
    
    constructor(private menuIndovidualService: MenuIndividualService, private credService: CredService, private utilservice: UtilService, public tagService: TagService) {
        
    }
    
    fileName: string = "";
    fileUrl: string = "";
    image: File = null;
    mode = 0;
    menuIndividual: any = {name: "", konten: "", memo: "", price: null, tags: null, menus: null};
    formData:FormData ;
    showMenu: boolean = false;
//    menus: any[] = [];
    
    @ViewChild("inputName") inputName: any;
    @ViewChild("inputFakeFile") inputFakeFile: any;
    @ViewChild("autoComplete") autoComplete: AutoCompleteComponent;
    
    @Output()
    cancelButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    okButtonClicked: EventEmitter<any> = new EventEmitter<any>();    
    
//    tags: any[] = [{id: 0, tagName: "RETRIEVING DATA, PLEASE WAIT"}];
    
    public setMenuIndividual(mi) {
//        this.utilservice.printObject("MI: ", mi);
        if(mi) {
            this.menuIndividual = {id: mi.id, name: mi.name, konten: mi.konten, memo: mi.memo, price: mi.price, tags: mi.tags, image: mi.image, menus: mi.menus}
            this.fileUrl = this.credService.getImageURL(mi.image);
            this.fileName = mi.image;
            this.image = null;
//            this.menus = [];
//            if(mi.menus && mi.menus.length > 0) {
//                for(var i=0; i < mi.menus.length ; i++) {
//                    this.menus.push(mi.menus[i].menu);
//                }
//            }
        }
        else {
            this.menuIndividual = {name: "", konten: "", memo: "", price: null, tags: null, menus: null};
            this.fileUrl = null;
            this.fileName = null;
            this.image = null;
//            this.menus = [];
        }
    }  
        
    goBack() {
        this.menuIndividual.tags = null;
        this.cancelButtonClicked.emit();
    }

    
    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            this.image = file;
            this.fileName = file.name;
            this.menuIndividual.image = file.name;
            this.readUrl(event);
        }
    }  
    
    readUrl(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event:any) => {
                this.fileUrl = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    } 
    
    isFormValid() {
        return this.menuIndividual.name && this.menuIndividual.konten && this.menuIndividual.price && this.menuIndividual.image;
    }
    
    submit() {
        let obs ;
        
        let tags: any[] = this.autoComplete.getTags();
        if(this.menuIndividual.id) {
            obs = this.menuIndovidualService.editMenuIndividual(this.menuIndividual.id, this.menuIndividual.name, this.menuIndividual.konten, 
                this.menuIndividual.memo, this.menuIndividual.price, this.menuIndividual.available, tags, this.menuIndividual.menus, this.image);
        }
        else
            obs = this.menuIndovidualService.addMenuIndividual(this.menuIndividual.name, this.menuIndividual.konten, 
                this.menuIndividual.memo, this.menuIndividual.price, tags, this.menuIndividual.menus, this.image);
            
        obs.subscribe(
            data => {
                if(data.errorMessage) {
                    alert("ERROR RESPONSE: " + data.errorMessage);
                    return;
                }
                this.okButtonClicked.emit(data);
            },
            error => {
                alert("ERROR: " + error);
            }
        )
    }
        
    getTags() {
        return [this.tagService.masterTagsList];
    }
    
    addMenu() {
       this.showMenu = true;
    }
   
   handleAddedMenu(menus) {
       this.showMenu = false;
//       this.utilservice.printObject("M: ", menus)
       if(menus) {
            this.menuIndividual.menus= [];
            for(var i = 0; i < menus.length; i++) {
                this.menuIndividual.menus.push({menu: menus[i]});
            }
       }
//       this.utilservice.printObject("M: ", this.menuIndividual)
//       this.menus = menus;
   }
   
   handleCanceledMenu() {
       this.showMenu = false;
   } 
}