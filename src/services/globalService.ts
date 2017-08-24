import { Injectable, Input, Output, EventEmitter }	from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { MasterMenuService  } from './mastermenuservice';
import { MenuIndividualService  } from './menuindividualservice';
import { ScheduledPackageService  } from './scheduledpackageservice';
import { CredService  } from './credservice';
import { TagService  } from './tagservice';
import { UtilService  } from './utilservice';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class GlobalService {
        
    constructor(private utilService: UtilService, 
                private credService: CredService, 
                private tagService: TagService,
                private mmService: MasterMenuService,
                private miService: MenuIndividualService, 
                private spService: ScheduledPackageService, ) {
    }
    
    public reset() {
        this.credService.reset();
        this.mmService.reset();
        this.miService.reset();
        this.spService.reset();
    }
}
