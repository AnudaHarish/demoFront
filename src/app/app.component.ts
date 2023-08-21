import { Component, OnInit } from '@angular/core';
import { UserService } from './_service/user/user.service';
import { UserAuthService } from './_service/user-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demoFront';


  constructor(public userAuthService: UserAuthService, private router: Router) { }
  ngOnInit(): void {

  }

  logout() {

    if (!this.userAuthService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }












}
