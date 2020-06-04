import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { CredService } from './credservice';
import { UtilService } from './utilservice';

@Injectable()
export class TagService {
    
   masterTagsList: any[];
   loaded: boolean = false;

    constructor(private http: Http, private credService: CredService, private utilService: UtilService) {
    }
    
    public reset() {
        this.masterTagsList = null;
        this.loaded = false;
    }
        
    public getTags() {
        let params: URLSearchParams = new URLSearchParams();
        params.set('sessionString', this.credService.sessionString);

        let requestOptions = new RequestOptions();
        requestOptions.params = params;

        let url = 'http://192.168.1.13:8080/stonefire/resource/tags';
//        return   this.http.get(url, requestOptions)
//                     .map(this.extractData)
//                     .catch(this.handleError);
        return this.utilService.getRequest(url, params)
            .map(
                data => {
                    this.loaded = true;
                    
                    if(!data.errorMessage) 
                        this.masterTagsList = data.masterTagsList;
                        
                        if(this.masterTagsList) {
                            for (var i = 0; i < this.masterTagsList.length ; i++) {
                                this.masterTagsList[i].toString = function () {
                                    return this.name;
                                };
                                
//                                this.masterTagsList[i].name = this.masterTagsList[i].tagName;
                            }
                        }
                    
                    return data; 
                }
            )
    }
}
