
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; ;
import { ScheduledPackageService  } from '../../services/scheduledpackageservice';
import { CredService  } from '../../services/credservice';
import { TagService  } from '../../services/tagservice';
import { UtilService  } from '../../services/utilservice';
import { AutoCompleteComponent  } from '../../components/autocomplete/autocomplete';

@Component({
  selector: 'addmenupaket',
  templateUrl: 'addmenupaket.html',
  styleUrls: ['addmenupaket.scss']
 })
export class AddMenuPaket {
    
    constructor(private scheduledPackageService: ScheduledPackageService, private utilService: UtilService, private credService: CredService, public tagService: TagService) {
    }
    
    fileName: string = "";
    fileUrl: string = "";
    image: File = null;
    mode = 0;
    currentView = 'form';
    scheduledPackage: any = {name: "", konten: "", memo: "", price: null, minOrder: null, menus: null};
    formData:FormData ;
    tags: any[] = [{id: 0, tagName: "RETRIEVING DATA, PLEASE WAIT"}]
    isLoading: boolean = false;
    
    @ViewChild("inputImage") inputImage: any;
    @ViewChild("autoComplete") autoComplete: AutoCompleteComponent;
    
    @Output()
    cancelButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    okButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    public setScheduledPackage(sp) {
//        this.utilService.printObject("SP : ", sp);
        if(sp) {
            this.scheduledPackage = {id: sp.id, name: sp.name, konten: sp.konten, memo: sp.memo, price: sp.price, minOrder: sp.minOrder, 
                tags: sp.tags, image: sp.image, menus: sp.menus}
            this.fileUrl = this.credService.getImageURL(sp.image);
            this.fileName = sp.image;
            this.image = null;
        }
        else {
            this.scheduledPackage = {name: "", konten: "", memo: "", price: null, minOrder: null, tags: null, menus: null};
            this.fileUrl = null;
            this.fileName = null;
            this.image = null;
        }
    }  
            
    goBack() {
        this.scheduledPackage.tags = null;
        this.cancelButtonClicked.emit();
    }

    
    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            this.image = file;
            this.fileName = file.name;
            this.scheduledPackage.image = file.name;
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
        return this.scheduledPackage.name && this.scheduledPackage.konten && this.scheduledPackage.price && this.scheduledPackage.minOrder && 
            this.scheduledPackage.image;
    }
    
    submit() {
        let obs ;
        let tags = this.autoComplete.getTags();
        this.isLoading = true;
        if(this.scheduledPackage.id) {
            obs = this.scheduledPackageService.editScheduledPackage(this.scheduledPackage.id, this.scheduledPackage.name, this.scheduledPackage.konten, 
                this.scheduledPackage.memo, this.scheduledPackage.price, this.scheduledPackage.minOrder, this.scheduledPackage.available, tags, 
                this.scheduledPackage.menus, this.image);
        }
        else
            obs = this.scheduledPackageService.addSecheduledPackage(this.scheduledPackage.name, this.scheduledPackage.konten, 
                this.scheduledPackage.memo, this.scheduledPackage.price, this.scheduledPackage.minOrder, tags, this.scheduledPackage.menus, this.image);
        
        setTimeout(() => {
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
                },
                () => {
                    this.isLoading = false;
                }
            )
        }, 1500);
    }
    
    setMenuHarian(obj) {
        this.currentView = "form";
        this.scheduledPackage.menus = obj;
    }
    
    toMenuHarian() {
        this.currentView = "menuharian";
    }      
}