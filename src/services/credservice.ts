import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UtilService } from './utilservice';
import {configUrl} from '../config/config';


@Injectable()
export class CredService {
    
    constructor(private utilService: UtilService, private http: Http) {}

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
//        formData.append("tenantProflePicture", tenant.profilePicture);
        formData.append("description", tenant.description);
        formData.append("name", user.name);
        formData.append("email", user.email);
        formData.append("password", user.password);
        formData.append("phoneNumber", user.phoneNumber);
//        formData.append("profilepicture", user.profilePicture);
        return this.utilService.postRequestWithForm(url, formData);
    }
    
    public clear() {
        this.email = null;
        this.name = null;
        this.sessionString = null;
    }


    private extractData(res: Response) {
        let retval = null ;
        if(res)
                retval = res.json();
         return retval;
    }

    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
          const body = error.json() || '';
          const err = body.error || JSON.stringify(body);
          errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
          errMsg = error.message ? error.message : error.toString();
        }
        return Observable.throw(errMsg);
    }
}