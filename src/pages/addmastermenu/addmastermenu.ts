
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; ;
import { MasterMenuService  } from '../../services/mastermenuservice';
import { CredService  } from '../../services/credservice';

@Component({
  selector: 'addmastermenu',
  templateUrl: 'addmastermenu.html',
  styleUrls: ['addmastermenu.scss']
 })
export class AddMasterMenu {
    
    constructor(private masterMenuService: MasterMenuService) {}
    
    fileName: string = "";
    fileUrl: string = "";
    image: File = null;
    mode = 0;
    masterMenu: any = {"name": "", "konten": "", "memo": ""};
    formData:FormData ;
    isLoading: boolean = false;
    
//    @ViewChild("inputFakeFile") inputFakeFile: any;
    @ViewChild("inputImage") inputImage: any;
    
    @Output()
    cancelButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    okButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    public setMasterMenu(mm) {
        if(mm) {
            this.masterMenu = mm;
            this.fileUrl = this.masterMenuService.getImageURL(mm.image);
            this.fileName = mm.image;
            this.image = null;
        }
        else {
            this.masterMenu = {"name": "", "konten": "", "memo": ""};
            this.fileUrl = null;
            this.fileName = null;
            this.image = null;
        }
    }  
    
    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            this.image = file;
            this.fileName = file.name;
            this.masterMenu.image = file.name;
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
        return this.masterMenu.name && this.masterMenu.konten && this.masterMenu.image;
    }
    
    submit() {
        let obs ;
        
        if(this.masterMenu.id) {
            obs = this.masterMenuService.editMasterMenu(this.masterMenu.id, this.masterMenu.name, this.masterMenu.konten, this.masterMenu.memo, this.image);
        }
        else
            obs = this.masterMenuService.addMasterMenu(this.masterMenu.name, this.masterMenu.konten, this.masterMenu.memo, this.image);
        
        this.isLoading = true;
        
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
        )}, 1500);
    }    
}