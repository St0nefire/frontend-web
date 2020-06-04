
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { CredService } from '../services/credservice';
import { Router } from '@angular/router'; 

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(private credService: CredService, private router: Router) {}

  canActivate(): boolean {
      if (this.credService.email)
        return true;
      else {
          this.router.navigate(["/login"]);
          return false;
      }
  }
}