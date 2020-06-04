import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilService {
    
//    masterTagsList: any[];
    headers: Headers = null;
    postOptions: RequestOptions = null;
    iDiv: HTMLDivElement = null;
    child: any = null;
    provincesList: any[] = null;
        
    constructor(private http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
        this.postOptions = new RequestOptions({headers: this.headers});
        
        this.iDiv = document.createElement("div");        
        this.iDiv.style.display = "flex";
        this.iDiv.style.justifyContent = "center"
        this.iDiv.style.alignItems = "center";
        this.iDiv.style.position = "fixed";
        this.iDiv.style.top = "0px";
        this.iDiv.style.left = "0px";
        this.iDiv.style.width = "100%";
        this.iDiv.style.height = "100%";
        this.iDiv.style.background = "rgba(220, 220, 220, 0.7)";
        this.iDiv.style.border = "1px solid blue";
        this.iDiv.style.zIndex = "1000";
    }
        
    public reset() {
        this.provincesList = null;
    }
    
    public getProvinces() {
        let url = 'http://192.168.1.13:8080/stonefire/resource/provinces';        
        return this.getRequest(url, null)
                   .map(data => {
                       this.provincesList = data.provincesList;
                       return data;
                    })
    }
    
    public getRequest(url: string, params: URLSearchParams) {
        let requestOptions = new RequestOptions();
        requestOptions.params = params;
        return   this.http.get(url, requestOptions)
                     .map(this.extractData)
                     .catch(this.handleError);
    }
    
    public deleteRequest(url: string, params: URLSearchParams) {
        let requestOptions = new RequestOptions();
        requestOptions.params = params;
        return   this.http.delete(url, requestOptions)
                     .map(this.extractData)
                     .catch(this.handleError);
    }
    
    public postRequest(url: string, jsonData: any) {
        let jsonString = jsonData ? JSON.stringify(jsonData) : null;
        return this.http.post(url, jsonString, this.postOptions)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    public postRequestWithForm(url: string, formData: FormData) {
        return this.http.post(url, formData, new RequestOptions())
                   .map(this.extractData)
                   .catch(this.handleError)
    }
    
    public putRequest(url: string, jsonData: any) {
        let jsonString = JSON.stringify(jsonData);
        return this.http.put(url, jsonString, this.postOptions)
                        .map(this.extractData)
                        .catch(this.handleError);
    }
    
    public putRequestWithForm(url: string, formData: FormData) {
        return this.http.put(url, formData, new RequestOptions())
                   .map(this.extractData)
                   .catch(this.handleError)
    }
    
    public cloneObject(obj: any) {
        if(obj)
            return JSON.parse(JSON.stringify(obj));
    }
    
    public showInDialog(obj: any) {
        var body = document.body;  
//        let children = body.children;
//        console.log("SHOW IN DIALOG CALLED children: " + children.length);
//        for (var i = 0; i < children.length; i++) {
//            console.log("ID: " + children[i].id)
//        }
        this.iDiv.appendChild(obj);
        body.appendChild(this.iDiv);
        this.child = obj;
    }
    
    public stopDialog() {
        if(!this.child)
            return;
            
        var body = document.body;
        this.iDiv.removeChild(this.child);
        body.removeChild(this.iDiv);
        
        this.child = null;
    }
    
    public printObject(text: string, obj: any) {
        console.log(text + JSON.stringify(obj, undefined, 4));
    }
    
    public setBackgroundColor(color: string) {
        document.body.style.backgroundColor = color;
    }
        
    
    private extractData(res: Response) {
        let retval = null ;
        if (res && res.ok) {
            retval = res.json();
            if(retval.errorMessage)
                throw retval.errorMessage;
        }
        else {
            Observable.throw(res);
        }
        
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
