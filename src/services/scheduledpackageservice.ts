import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CredService } from './credservice';
import { UtilService } from './utilservice';
import { TenantService } from './tenantservice';
import { MasterMenuService } from './mastermenuservice';

@Injectable()
export class ScheduledPackageService{
    
    constructor(private http: Http, private utilService: UtilService, private credService: CredService, 
                private tenantService: TenantService, private mmService: MasterMenuService) {}
    
    spList: any[] ;
    tenantSpList : Map<any, any[]> = new Map<any, any[]>();
    loaded: boolean = false;
    
    public reset() {
        this.spList = null;
        this.loaded = false;
    }
    
    public getScheduledPackages() {
        this.loaded = false;
        let params: URLSearchParams = new URLSearchParams();
        let url = 'http://192.168.1.13:8080/stonefire/resource/scheduledpackage';
        params.set('sessionString', this.credService.sessionString);
        
        return this.utilService.getRequest(url, params)
                   .map(
                        data => {
                            this.loaded = true;
                            this.spList = data.scheduledPackageList;
                            return this.mapIncomingScheduledPackageList(data);
                        }
                    )
    }
    
    public getScheduledPackagesByTenant(tenant) {
        let params: URLSearchParams = new URLSearchParams();
        let url = 'http://192.168.1.13:8080/stonefire/resource/scheduledpackage';
        params.set('tenantId', tenant.id);
        
        return this.utilService.getRequest(url, params)
            .map(
                data => {
                    this.tenantSpList.set(tenant.id, data.scheduledPackageList);
                    return this.mapIncomingScheduledPackageList(data);
                }
            );
    }
        
    addSecheduledPackage(name: string, konten: string, memo: string, price: number, minOrder: number, tags: any[], menus: any[], image: File) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/scheduledpackage/';
        var formData = new FormData();
        var tagsString: string = ""
        var menusString: string = ""
        if(image) {
            formData.append("uploadFile", image, image.name);
        }
        formData.append("name", name);
        formData.append("konten", konten);
        formData.append("memo", memo);
        formData.append("price", price + "");
        formData.append("minOrder", minOrder + "");
        if(tags) {
            for(var i = 0; i < tags.length; i++) {
                tagsString += tags[i].name + ";";
            }
            tagsString = tagsString.substring(0, tagsString.length - 1);
            formData.append("tags", tagsString);
        }
        if(menus) {
            for(var i = 0; i < menus.length; i++) {
                menusString += menus[i].menu.id + "_" + menus[i].date + ";";;
            }
            menusString = menusString.substring(0, menusString.length - 1);
            formData.append("menus", menusString);
        }
        formData.append("sessionString", this.credService.sessionString);
        return this.utilService.postRequestWithForm(url, formData)
                   .map(
                        data => {
                            this.mapIncomingScheduledPackage(data);
                            if (!this.spList) {
                                this.spList = [];
                            }

                            this.spList.push(data);
                                
                            return data; 
                        }
                    )
    }
    
    editScheduledPackage(id: string, name: string, konten: string, memo: string, price: number, minOrder: number, available: boolean, tags: any[], menus: any[],
        image: File) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/scheduledpackage/';
        var formData = new FormData();
        var tagsString: string = "";
        var menusString: string = ""
        if(image) {
            formData.append("uploadFile", image, image.name);
        }            
        formData.append("id", id);
        formData.append("name", name);
        formData.append("konten", konten);
        formData.append("memo", memo);
        formData.append("price", price + "");
        formData.append("minOrder", minOrder + "");
        formData.append("available", available + "");
        if(tags) {
            for(var i = 0; i < tags.length; i++) {
                tagsString += tags[i].name + ";";
            }
            tagsString = tagsString.substring(0, tagsString.length - 1);
            formData.append("tags", tagsString);
        }
        if(menus) {
            for(var i = 0; i < menus.length; i++) {
                menusString += menus[i].menu.id + "_" + menus[i].date + ";";;
            }
            menusString = menusString.substring(0, menusString.length - 1);
            formData.append("menus", menusString);
        }
        formData.append("sessionString", this.credService.sessionString);
        return this.utilService.putRequestWithForm(url, formData)
                   .map(
                        data => {
                            this.mapIncomingScheduledPackage(data);
                            if (this.spList) {
                                for (var i = 0; i < this.spList.length; i++) {
                                    if (this.spList[i].id == data.id) {
                                        this.spList[i] = data;
                                        break;
                                    }
                                }
                            }
                                
                            return data; 
                        }
                    )
    }
        
    deleteScheduledPackage(id: number) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/scheduledpackage/';
        let params: URLSearchParams = new URLSearchParams();
        params.set('sessionString', this.credService.sessionString);
        params.set("id", id + "");
        return this.utilService.deleteRequest(url, params)
                   .map(
                        data => {
                            for (var i = 0; i < this.spList.length; i++) {
                                if (this.spList[i].id == id) {
                                    this.spList.splice(i, 1);
                                    break;
                                }
                            }
                            return data; 
                        }
                    )
    }
    
    private mapIncomingScheduledPackageList(data) {
        if(!data.errorMessage) { 
            if(data.scheduledPackageList) {
                for (var i = 0; i < data.scheduledPackageList.length ; i++) {
                    this.mapIncomingScheduledPackage(data.scheduledPackageList[i]);
                }
            }
        }
        return data.scheduledPackageList; 
    }
    
    private mapIncomingScheduledPackage(data) {
        data.toString = function () {
            return this.name;
        };
                    
        data.tenant = this.tenantService.findById(null, null, data.tenantId);

        if(data.menus && data.menus.length > 0) {
            for (var c = 0; c < data.menus.length ; c++) {
                data.menus[c].menu = this.mmService.findById(data.tenant, data.menus[c].masterMenuId)
            }
        }
        
        return data;
    }
}
