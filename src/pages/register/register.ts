
import { Component, Input, Output, EventEmitter, ViewChild  } from '@angular/core'; ;
import { CredService  } from '../../services/credservice';
import { UtilService  } from '../../services/utilservice';
import { Router } from '@angular/router'; 

@Component({
  selector: 'register',
  templateUrl: 'register.html',
  styleUrls: ['register.scss']
 })
export class RegisterPage {
    
    constructor(private router: Router, private utilService: UtilService, private credService: CredService) {
    }
    
    currentView = "tenant";
    fileName: string = "";
    fileUrl: string = "";
    tenantFileName: string = "";
    tenantFileUrl: string = "";
    image: File = null;
    tenantImage: File = null;
    user: any = {name: "", email: "", password: "", phoneNumber: "", profilePicture: ""};
    tenant: any = {name: "", email: "", password: "", phoneNumber: "", profilePicture: "", description: ""};
    formData:FormData ;
    
    @ViewChild("inputFakeFile") inputFakeFile: any;
    @ViewChild("inputTenantFakeFile") inputTenantFakeFile: any;
    
    @Output()
    cancelButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    okButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
            
    next() {
        this.currentView = "user";
    }
    
    prev() {
        this.currentView = "tenant";
    }

    
    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            this.image = file;
            this.fileName = file.name;
            this.user.profilePicture = file.name;
            this.readUrl(event);
        }
    } 
    
    tenantFileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            this.tenantImage = file;
            this.tenantFileName = file.name;
            this.tenant.profilePicture = file.name;
            this.readTenantUrl(event);
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
    
    readTenantUrl(event) {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = (event:any) => {
                this.tenantFileUrl = event.target.result;
            }
            reader.readAsDataURL(event.target.files[0]);
        }
    } 
    
    isFormValid() {
        return this.user.name && this.user.email && this.user.password && this.user.phoneNumber && 
            this.user.profilePicture;
    }
    
    isTenantFormValid() {
        return this.tenant.name && this.tenant.email && this.tenant.password && this.tenant.phoneNumber && 
            this.tenant.profilePicture;
    }
    
    submit() {
//        this.utilService.printObject("USER: ", this.user);
//        this.utilService.printObject("TENANT: ", this.tenant);

        let obs = this.credService.registerUser(this.user, this.tenant, this.tenantImage, this.image);
            
        obs.subscribe(
            data => {
                if(data.errorMessage) {
                    alert("ERROR RESPONSE: " + data.errorMessage);
                    return;
                }
                alert("REGISTERED SUCCESSFULLY");
                this.router.navigate(["/login"]);
            },
            error => {
                alert("ERROR: " + error);
            }
        )
    }
        
}