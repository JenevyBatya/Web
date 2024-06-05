import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerModule } from 'primeng/spinner';
import { SliderModule } from 'primeng/slider';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TotallyNothingComponent } from './components/totally-nothing/totally-nothing.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { StarterComponent } from './components/starter/starter.component';
import { AuthServiceService } from './service/auth-service.service';
import { LogoutComponent } from './components/logout/logout.component';
import { SvgResizeDirective } from './directive/svg-resize.directive';
import { DrawFiguresDirective } from './directive/draw-figures.directive';
import { DrawPointDirective } from './directive/draw-point.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TotallyNothingComponent,
    RegistrationComponent,
    StarterComponent,
    LogoutComponent,
    SvgResizeDirective,
    DrawFiguresDirective,
    DrawPointDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SpinnerModule,
    SliderModule,
    MatProgressSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
