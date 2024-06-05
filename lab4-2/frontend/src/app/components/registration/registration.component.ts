import { Component } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { Router } from '@angular/router';
import { NavigationService } from 'src/app/service/navigation.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  token = '';
  isLoggedIn: boolean = false;
  constructor(private http: HttpClient, private authService: AuthServiceService, private router: Router, private nav: NavigationService) {
    this.token = authService.getToken();
    this.isLoggedIn = authService.getIsLoggedIn();
    console.log(this.token, this.isLoggedIn)
  }
  user = {
    login: "",
    password: ""
  }
  submitForm() {
    //TODO
    this.http.post<any>('http://localhost:8080/signup', this.user, { observe: 'response' })
      .subscribe(
        (response: HttpResponse<any>) => {
          if (response.ok) {
            const headerUser = response.headers.get('Authorization');
            if (headerUser !== null) {
              this.authService.updatetToken(headerUser)
              this.token = this.authService.getToken();
              this.isLoggedIn = this.authService.getIsLoggedIn();
              this.nav.toStarter()
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
        }
      );
  }
}
