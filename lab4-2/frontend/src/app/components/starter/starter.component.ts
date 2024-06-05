import { Component, Optional } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/service/navigation.service';


@Component({
  selector: 'app-starter',
  templateUrl: './starter.component.html',
  styleUrls: ['./starter.component.css']
})
export class StarterComponent {
  token = '';
  isLoggedIn: boolean = false;
  isWaitingForAnAnswer = false;

  constructor(private http: HttpClient, private authService: AuthServiceService, private router: Router, private nav: NavigationService) {
    this.token = authService.getToken();
    this.isLoggedIn = authService.getIsLoggedIn();
    
  }
  // ngOnInit(): void {
  //   console.log(this.authService)
  //   this.authService.userId$.subscribe((userId) => (this.userId = userId));
  //   this.authService.isLoggedIn$.subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn));
  //   console.log(this.userId)
  //   console.log(this.authService.userId$)
  // }
  user = {
    login: "",
    password: ""
  }
  toMain(): void {
    this.nav.toMain();

  }

  submitForm() {
    this.isWaitingForAnAnswer = true;
    //TODO
    this.http.post<any>('http://localhost:8080/starter', this.user, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.ok) {
            console.log(response.headers.get('Authorization'))
            const headerUser = response.headers.get('Authorization');
            if (headerUser !== null) {
              this.authService.updatetToken(headerUser)
              this.token = this.authService.getToken();
              this.isLoggedIn = this.authService.getIsLoggedIn();
              console.log(this.token, this.isLoggedIn)
              location.reload();
            }
          } else {
            console.log(response.body);
            console.log('not ok');
          }
        },
        (error) => {
          // Handle error responses
          if (error.status === 404) {
            console.log('User not found');
          } else {
            console.error('Error:');
          }
        },
        () => {
          this.isWaitingForAnAnswer = false;
        }
      );
  }
}
