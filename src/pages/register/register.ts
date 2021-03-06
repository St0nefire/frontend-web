
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
        let obs = this.utilService.getProvinces();
        this.isLoading = true;
        obs.subscribe(
            data => {
                this.provincesList = data.provincesList;
                this.province = this.returnProvince(this.provincesList[0].name);
                this.tenant.province = this.provincesList[0].name;
                this.utilService.printObject("Province: ", this.province);
            },
            error => {
                this.isError = true; 
            },
            () => {
                this.isLoading = false;
            }
        )
    }
    
    provincesList: any[] = null;
    province: any = null;
    currentView = "tenant";
    fileName: string = "";
    fileUrl: string = "";
    tenantFileName: string = "";
    tenantFileUrl: string = "";
    image: File = null;
    tenantImage: File = null;
    user: any = {name: "", email: "", password: "", phoneNumber: "", profilePicture: ""};
    tenant: any = {name: "", email: "", password: "", phoneNumber: "", profilePicture: "", description: "", province: null, regency: null, address: ""};
    formData:FormData ;
    headerTitle: string = "Pendaftaran step 1";
    isLoading: boolean = false;
    isError: boolean = false;
    
    @ViewChild("cmbProvince") cmbProvince: any;
    @ViewChild("cmbRegency") cmbRegency: any;
    
    @Output()
    cancelButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
    @Output()
    okButtonClicked: EventEmitter<any> = new EventEmitter<any>();
    
            
    next() {
        this.utilService.printObject("T: " , this.tenant);
        this.headerTitle = "Pendaftaran Step 2";
        this.currentView = "user";
    }
    
    prev() {
        this.headerTitle = "Pendaftaran Step 1";
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
        return this.tenant.name && this.tenant.email && this.tenant.password && this.tenant.phoneNumber && this.tenant.province && this.tenant.regency &&
            this.tenant.address && this.tenant.profilePicture;
    }
    
    returnProvince(name) {
        for (var i = 0; i < this.provincesList.length; i++) {
            if (this.provincesList[i].name == name)
                return this.provincesList[i];
        }
    }
    
    changeProvince(id) {
        this.province = this.returnProvince(id);
        if (this.province.regencies && this.province.regencies.length > 0)
            this.tenant.regency = this.province.regencies[0].name;
        this.utilService.printObject("PR: ", this.province);
    }
    
    submit() {
//        this.utilService.printObject("USER: ", this.user);
//        this.utilService.printObject("TENANT: ", this.tenant);

        let obs = this.credService.registerUser(this.user, this.tenant, this.tenantImage, this.image);
        this.isLoading = true;
        setTimeout(() => {    
            obs.subscribe(
                data => {
                    if(data.errorMessage) {
                        alert("ERROR RESPONSE: " + data.errorMessage);
                        return;
                    }
                    alert("REGISTERED SUCCESSFULLY");
                    this.isLoading = false;
                    // tunda navigasi sampai method ini beres agar loadingnya mati, karena loadingnya didetek mati setelah methiod beres
                    setTimeout(() => this.router.navigate(["/login"]), 1000);
                },
                error => {
                    alert("ERROR: " + error);
                },
                () => {
                    console.log("finally is called")
                    this.isLoading = false;
                }
            )
        }, 1500);
    }
        
}