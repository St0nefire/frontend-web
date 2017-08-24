import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CredService } from './credservice';
import { UtilService } from './utilservice';

@Injectable()
export class MasterMenuService {
    
    constructor(private http: Http, private utilService: UtilService, private credService: CredService) {
    }
    
    mmList: any[] ;
    loaded: boolean = false;
    
    public reset() {
        this.mmList = null;
        this.loaded = false;
    }
    
    public getMasterMenus() {
        let params: URLSearchParams = new URLSearchParams();
        let url = 'http://192.168.1.13:8080/stonefire/resource/mastermenu';
        params.set('sessionString', this.credService.sessionString);
        
        return this.utilService.getRequest(url, params)
            .map(
                data => {
                    this.loaded = true;
                    
                    if(!data.errorMessage) 
                        this.mmList = data.masterMenuList;
                        
                        if(this.mmList) {
                            for (var i = 0; i < this.mmList.length ; i++) {
                                this.mmList[i].toString = function () {
                                    return this.name;
                                };
                            }
                        }
                    
                    return data; 
                }
            )
    }
    
    public getImageURL(image: string) {
        return 'http://192.168.1.13:8080/stonefire/resource/image?sessionString=' + this.credService.sessionString + '&image=' + image;
    }
    
    addMasterMenu(name: string, konten: string, memo: string, image: File) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/mastermenu/';
        var formData = new FormData();
        if(image) {
            formData.append("uploadFile", image, image.name);
        }
        formData.append("name", name);
        formData.append("konten", konten);
        formData.append("memo", memo);
        formData.append("sessionString", this.credService.sessionString);
        return this.utilService.postRequestWithForm(url, formData)
                    .map(
                        data => {
                            if(!data.errorMessage) {
                                
                                    
                                if (!this.mmList) {
                                    this.mmList = [];
                                }

                                this.mmList.push(data);
                            }
                                
                            return data; 
                        }
                    )
    }
    
    editMasterMenu(id: string, name: string, konten: string, memo: string, image: File) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/mastermenu/';
        var formData = new FormData();
        if(image) {
            formData.append("uploadFile", image, image.name);
        }
        formData.append("id", id);
        formData.append("name", name);
        formData.append("konten", konten);
        formData.append("memo", memo);
        formData.append("sessionString", this.credService.sessionString);
        return this.utilService.putRequestWithForm(url, formData)
                   .map(
                        data => {
                            if(!data.errorMessage) {
                                
                                if (this.mmList) {
                                    for (var i = 0; i < this.mmList.length; i++) {
                                        if (this.mmList[i].id == data.id) {
                                            this.mmList[i] = data;
                                            break;
                                        }
                                    }
                                }
                            }
                            return data; 
                        }
                    )
    }
    
    editActiveStatus(id: number, active: boolean) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/mastermenu/';
        return this.utilService.putRequest(url, {"sessionString": this.credService.sessionString, "id": id, "active": active});
    }
    
    deleteMasterMenu(id: number) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/mastermenu/';
        let params: URLSearchParams = new URLSearchParams();
        params.set('sessionString', this.credService.sessionString);
        params.set("id", id+ "");
        return this.utilService.deleteRequest(url, params);
    }
    
    findById(id) {
        if (this.mmList) {
            let retval = this.mmList.filter(mm => {
                return mm.id == id;
            });
            
            if (retval && retval.length > 0)
                return retval[0];
        }
    }
}
