import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  isLoggedIn: boolean;
  constructor(private authService: AuthServiceService, private router: Router, private nav: NavigationService) {
    this.isLoggedIn = authService.getIsLoggedIn();
    console.log('новый логаут', this.isLoggedIn)
  }
  ngOnInit(): void {
    // Initialize isLoggedIn based on the current authentication state
    this.isLoggedIn = this.authService.getIsLoggedIn();

  };
  logout(): void {
    this.authService.logOut()
    location.reload();

  }
  signup(): void {
    this.nav.toSignup()
  }
  isSignupPage(): boolean {
    return this.router.url === '/signup';
  }
  isStarterPage(): boolean {
    return this.router.url === '/starter'
  }
  starter(): void {
    this.nav.toStarter()

  }
  isMainPage():boolean{
    return this.router.url==='/main'
  }
}
