import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CredService } from './credservice';
import { UtilService } from './utilservice';
import { MasterMenuService } from './mastermenuservice';

@Injectable()
export class MenuIndividualService {
    
    constructor(private http: Http, private mmService: MasterMenuService, private utilService: UtilService, private credService: CredService) {};
    
    miList: any[];
    loaded: boolean = false;
    
    public reset() {
        this.miList = null;
        this.loaded = false;
    }
    
    public getMenuIndividuals() {
        let params: URLSearchParams = new URLSearchParams();
        let url = 'http://192.168.1.13:8080/stonefire/resource/menuindividual';
        params.set('sessionString', this.credService.sessionString);
        
        return this.utilService.getRequest(url, params)
                   .map(
                        data => {
                            this.loaded = true;
                            if(!data.errorMessage) 
                                this.miList = data.menuIndividualList;

                                if(this.miList) {
                                    for (var i = 0; i < this.miList.length ; i++) {
                                        this.miList[i].toString = function () {
                                            return this.name;
                                        };
                                        
                                        if(this.miList[i].menus && this.miList[i].menus.length > 0) {
                                            for (var c = 0; c < this.miList[i].menus.length ; c++) {
                                                this.miList[i].menus[c].menu = this.mmService.findById(this.miList[i].menus[c].masterMenuId)
                                            }
                                        }
                                        
//                                        if(this.miList[i].tags && this.miList[i].tags.length > 0) {
//                                            for (var c = 0; c < this.miList[i].tags.length ; c++) {
//                                                this.miList[i].tags[c].name = this.miList[i].tags[c].tagName;
//                                            }
//                                        }
                                    }
                                }

                            return data; 
                        }
                    )
    }
        
    addMenuIndividual(name: string, konten: string, memo: string, price: number, tags: any[], menus: any[], image: File) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/menuindividual/';
        var formData = new FormData();
        var tagsString: string = "";
        var menusString: string = ""
        
        if(image) {
            formData.append("uploadFile", image, image.name);
        }
        formData.append("name", name);
        formData.append("konten", konten);
        formData.append("memo", memo);
        formData.append("price", price + "");
        
        if(tags) {
            for(var i = 0; i < tags.length; i++) {
                tagsString += tags[i].name + ";";
            }
            tagsString = tagsString.substring(0, tagsString.length - 1);
            formData.append("tags", tagsString);
        }
        if(menus) {
            for(var i = 0; i < menus.length; i++) {
                menusString += menus[i].menu.id + ";";;
            }
            menusString = menusString.substring(0, menusString.length - 1);
            formData.append("menus", menusString);
        }
        formData.append("sessionString", this.credService.sessionString);
//        return this.utilService.postRequestWithForm(url, formData);
        return this.utilService.postRequestWithForm(url, formData)
                   .map(
                        data => {
                            if(!data.errorMessage) {
                                if(data.menus && data.menus.length > 0) {
                                    for (var c = 0; c < data.menus.length ; c++) {
                                        data.menus[c].menu = this.mmService.findById(data.menus[c].masterMenuId)
                                    }
                                }
                                
//                                if(data.tags && data.tags.length > 0) {
//                                    for (var c = 0; c < data.tags.length ; c++) {
//                                        data.tags[c].name = data.tags[c].tagName;
//                                    }
//                                }
                                    
                                if (!this.miList) {
                                    this.miList = [];
                                }

                                this.miList.push(data);
                            }
                                
                            return data; 
                        }
                    )
    }
    
    editMenuIndividual(id: string, name: string, konten: string, memo: string, price: number, available: boolean, tags: any[], menus: any[], image: File) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/menuindividual/';
        var formData = new FormData();
        var tagsString: string = "";
        var menusString: string = "";
        
        if(image) {
            formData.append("uploadFile", image, image.name);
        }
        
        formData.append("id", id);
        formData.append("name", name);
        formData.append("konten", konten);
        formData.append("memo", memo);
        formData.append("price", price + "");
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
                menusString += menus[i].menu.id + ";";;
            }
            menusString = menusString.substring(0, menusString.length - 1);
            formData.append("menus", menusString);
        }
        formData.append("sessionString", this.credService.sessionString);
//        return this.utilService.putRequestWithForm(url, formData);
        return this.utilService.putRequestWithForm(url, formData)
                   .map(
                        data => {
                            if(!data.errorMessage) {
                                if(data.menus && data.menus.length > 0) {
                                    for (var c = 0; c < data.menus.length ; c++) {
                                        data.menus[c].menu = this.mmService.findById(data.menus[c].masterMenuId)
                                    }
                                }
                                    
                                if (this.miList) {
                                    for (var i = 0; i < this.miList.length; i++) {
                                        if (this.miList[i].id == data.id) {
                                            this.miList[i] = data;
                                            break;
                                        }
                                    }
                                }
                            }
                            return data; 
                        }
                    )
    }
        
    deleteMenuIndividual(id: number) {
        let url = 'http://192.168.1.13:8080/stonefire/resource/menuindividual/';
        let params: URLSearchParams = new URLSearchParams();
        params.set('sessionString', this.credService.sessionString);
        params.set("id", id+ "");
        return this.utilService.deleteRequest(url, params)
                               .map(
                                    data => {
                                        if(!data.errorMessage) {
                                            for (var i = 0; i < this.miList.length; i++) {
                                                if (this.miList[i].id == data.id) {
                                                    this.miList.splice(i, 1);
                                                    break;
                                                }
                                            }
                                        }
                                        
                                        return data;
                                    }
                               )
                               
    }
}
