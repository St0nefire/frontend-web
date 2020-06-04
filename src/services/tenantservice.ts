import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { UtilService } from './utilservice';
import {configUrl} from '../config/config';


@Injectable()
export class TenantService {
    
    constructor(private http: Http, private utilService: UtilService) {}
    
    public tenantsList:  Map<string, any[]> = new Map<string, any[]>();
    public currentTenant: any = null;
    
    public reset() {
        this.tenantsList = null
        this.currentTenant = null;
    }
    
    public setCurrentTenant(tenant) {
        this.currentTenant = tenant;
    }
        
    public getTenants(province: string, city: string) {
        let params: URLSearchParams = new URLSearchParams();
        let url = 'http://192.168.1.13:8080/stonefire/resource/tenants';
        params.set('province', province);
        params.set('city', city);

        return this.utilService.getRequest(url, params)
            .map(
                data => {
                    this.tenantsList.set(province + city, data.tenantsList)
                    return this.mapIncomingTenantData(data); 
                }
            )
    }
    
    // memerlukan tenant untuk menemukan menu paket
    findById(province: string, city: string, id) {
        if(this.currentTenant &&this.currentTenant.id == id) {
            return this.currentTenant;
        }
        if(province && city) {
            let listTenants = this.tenantsList.get(province + city);
            if(listTenants) {
                let retval = listTenants.filter(mm => {
                    return mm.id == id;
                });

                if (retval && retval.length > 0)
                    return retval[0];
            }
        }
        else {
            let res = null;
            this.tenantsList.forEach(
                (value: any[], key: string) => {
                    if(res)
                        return;
                    for(var i=0; i < value.length; i++) {
                        if(value[i].id == id) {
                            res = value[i];
                            break;
                        }
                    }
                }
            )
            return res;
        }
    }
    
    private mapIncomingTenantData(data) {
        if(data.tenantsList) {
                for (var i = 0; i < data.tenantsList.length ; i++) {
                    data.tenantsList[i].toString = function () {
                        return this.name;
                    };
                }
            }

        return data.tenantsList; 
    }
}