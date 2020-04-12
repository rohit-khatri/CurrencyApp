import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isUserAuthenticated: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isUserAuthenticated = this.authService.getIsAuthenticated();
    console.log(this.isUserAuthenticated);
  }

  onLogout() {
    this.authService.logout();
  }

}
