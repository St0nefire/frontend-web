import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UtilService } from './utilservice';
import { TenantService } from './tenantservice';
import {configUrl} from '../config/config';


@Injectable()
export class CredService {
    
    constructor(private utilService: UtilService, private tenantService: TenantService) {}
    
    public user: any = {};

    public email: string;
    public name: string;
    public sessionString: string;
    
    public reset() {
        this.email = null;
        this.name = null;
        this.sessionString = null;
    }
    
    

    public login( email: string, password: string) {
        let url = configUrl.loginUrl;
        return this.utilService.postRequest(url, {"email": email, "password": password})
                        .map(
                            obj => {
                                    this.user.email = obj.email; 
                                    this.user.name = obj.name;
                                    this.user.sessionString = obj.sessionString;
                                    this.user.tenant = obj.tenant;
                                    this.tenantService.setCurrentTenant(this.user.tenant);
                                    
                                    this.email = obj.email; 
                                    this.name = obj.name;
                                    this.sessionString = obj.sessionString;
                                    return obj;
                            })
    }
    
    public logout() {
        let url = 'http://192.168.1.13:8080/stonefire/resource/logout';
        return this.utilService.postRequest(url, {"sessionString": this.sessionString})
                               .map(
                                    obj => {
                                        this.user = {};
                                        this.email = null;
                                        this.name = null;
                                        this.sessionString = null;
                                        return obj;
                                    }
                               )
    }
        
    public getImageURL(image: string) {
        return 'http://192.168.1.13:8080/stonefire/resource/image?sessionString=' + this.sessionString + '&image=' + image;
    }
    
    public getTenantImageURL(tenantId: string, image: string) {
        return 'http://192.168.1.13:8080/stonefire/resource/image?tenantId=' + tenantId + '&image=' + image;
    }
    
    registerUser(user: any, tenant: any, tenantImage: File, image: File) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/register/';
        var formData = new FormData();
        if(tenantImage) {
            formData.append("tenantUploadFile", tenantImage, tenantImage.name);
        }
        if(image) {
            formData.append("uploadFile", image, image.name);
        }
        formData.append("tenantName", tenant.name);
        formData.append("tenantEmail", tenant.email);
        formData.append("tenantPassword", tenant.password);
        formData.append("tenantPhoneNumber", tenant.phoneNumber);
        formData.append("tenantProvince", tenant.province);
        formData.append("tenantRegency", tenant.regency);
        formData.append("tenantAddress", tenant.address);
        formData.append("tenantProflePicture", tenantImage);
        formData.append("description", tenant.description);
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("phoneNumber", user.phoneNumber);
        formData.append("profilepicture", image);
        return this.utilService.postRequestWithForm(url, formData);
    }
    
    public clear() {
        this.email = null;
        this.name = null;
        this.sessionString = null;
    }
}