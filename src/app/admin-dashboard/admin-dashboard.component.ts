import { Component, OnInit } from '@angular/core';
import { faHome } from '@fortawesome/free-solid-svg-icons'; '@fontawesome';
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'; import { UserAuthService } from '../_service/user-auth.service';
import { Router } from '@angular/router';
'@fontawesome';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  icon = faHome;
  arrow = faArrowCircleRight;

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  ngOnInit(): void {

  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/login']);

  }


}
