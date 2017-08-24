import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';  
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule, JsonpModule } from '@angular/http';

import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';

import { MasterMenuGroup } from '../pages/mastermenugroup/mastermenugroup';
import { MasterMenu } from '../pages/mastermenu/mastermenu';
import { AddMasterMenu } from '../pages/addmastermenu/addmastermenu';
import { MenuPaketGroup } from '../pages/menupaketgroup/menupaketgroup';
import { MenuPaket } from '../pages/menupaket/menupaket';
import { AddMenuPaket } from '../pages/addmenupaket/addmenupaket';
import { MenuIndividualGroup } from '../pages/menuindividualgroup/menuindividualgroup';
import { MenuIndividual } from '../pages/menuindividual/menuindividual';
import { AddMenuIndividual } from '../pages/addmenuindividual/addmenuindividual';
import { MenuHarian } from '../pages/menuharian/menuharian';
import { RegisterPage } from '../pages/register/register';

import { FooterPart } from '../part/footer/footer';
import { HeaderPart } from '../part/header/header';

import { CredService } from '../services/credservice' ;
import { MasterMenuService } from '../services/mastermenuservice' ;
import { ScheduledPackageService } from '../services/scheduledpackageservice' ;
import { MenuIndividualService } from '../services/menuindividualservice' ;
import { TagService } from '../services/tagservice' ;
import { UtilService } from '../services/utilservice' ;
import { GlobalService } from '../services/globalservice' ;

import { LoginGuard } from '../routeguard/loginguard' ;


import { LoadingDirective } from '../directives/loading' ;

import { AddMenuDialog } from '../dialog/addmenu' ;

import { AutoCompleteComponent } from '../components/autocomplete/autocomplete' ;
import { TextListComponent } from '../components/textlist/textlist' ;

import { AppComponent } from './app.component';

import {routes} from './route';

@NgModule({
  declarations: [
    AppComponent,
    WelcomePage,
    LoginPage,
    HomePage,
    
    MasterMenuGroup,
    MasterMenu,
    AddMasterMenu,
    MenuPaketGroup,
    MenuPaket,
    AddMenuPaket,
    MenuIndividualGroup,
    MenuIndividual,
    AddMenuIndividual,
    MenuHarian,
    RegisterPage,
    
    FooterPart,
    HeaderPart,
    
    LoadingDirective,
    
    AddMenuDialog,
    
    AutoCompleteComponent,
    TextListComponent   
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: 
  [ CredService, 
    MasterMenuService, 
    ScheduledPackageService, 
    MenuIndividualService, 
    TagService, 
    UtilService, 
    GlobalService,
    LoginGuard
   ],
  bootstrap: [AppComponent]
})
export class AppModule { }
