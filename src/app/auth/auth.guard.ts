import { Injectable, OnInit } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_service/user/user.service';
import { UserAuthService } from '../_service/user-auth.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, OnInit {

  ngOnInit(): void {

  }

  constructor(private userAuthService: UserAuthService, private router: Router, private userService: UserService) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Your authentication logic here

    if (this.userAuthService.getToken() !== null) {

      const role = route.data["roles"] as Array<string>;


      if (role) {
        const match = this.userService.roleMatch(role);

        if (match) {

          // this.router.navigate(['/user']);
          return true;
        }
        else {
          this.router.navigate(['/user']);
          return false;
        }
      }



    }

    this.router.navigate(['/login']);
    return false;// Replace with actual logic
  }



}