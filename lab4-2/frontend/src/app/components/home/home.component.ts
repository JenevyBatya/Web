import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { SvgResizeDirective } from 'src/app/directive/svg-resize.directive';
import { DrawFiguresDirective } from 'src/app/directive/draw-figures.directive';
import { DrawPointDirective } from 'src/app/directive/draw-point.directive';
import { GapSizeService } from 'src/app/service/gap-size.service';
import { HitCkeck } from 'src/app/pojos/HitCheck';
import { NavigationService } from 'src/app/service/navigation.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],

})
export class HomeComponent {

  @ViewChild(SvgResizeDirective, { static: false }) svgResizeDirective!: SvgResizeDirective;
  @ViewChild(DrawFiguresDirective, { static: false }) drawFiguresDirective!: DrawFiguresDirective;
  ngAfterViewInit(): void {
    this.svgResizeDirective.updateSvgElements();
    this.drawFiguresDirective.updateSvgElements()
    this.drawFiguresDirective.createQuarterShape()
    this.redrawPoints()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.svgResizeDirective.updateSvgElements()
    this.drawFiguresDirective.updateSvgElements()
    this.drawFiguresDirective.createQuarterShape()
    this.redrawPoints()

  }

  hit = {
    x: 0,
    y: 0,
    r: 0
  }

  hitCheckList: HitCkeck[] = []
  hitCheck: HitCkeck = new HitCkeck;


  valueX: number = 0
  valueR: number = 0

  token = '';
  isLoggedIn: boolean = false;
  isError = false;
  constructor(private http: HttpClient, private authService: AuthServiceService, private gapSizeService: GapSizeService, private nav: NavigationService) {
    this.token = authService.getToken();
    this.isLoggedIn = authService.getIsLoggedIn();
    this.getDataFromServer();
  }

  table = []

  getDataFromServer() {
    const token = this.authService.getToken().toString();
    const headers = { 'Authorization': token };

    this.http.get<any>('http://localhost:8080/main', { headers }).subscribe(
      (data) => {
        this.hitCheckList = data.items;
        this.redrawPoints()
        // console.log('Received data:', this.hitCheckList);
        // for (const hitCheck of this.hitCheckList) {
        //   console.log(hitCheck.x);
        // }
      },
      (error) => {
        console.error('Error:', error);
        if (error.status === 401) {
          this.authService.logOut();
        }
      }
    );

  }
  change() {
    console.log('change')
  }

  svgClick(event: MouseEvent) {
    const svgElement = document.getElementById('svg_OXY');
    const svg_graph = document.getElementById('svg_graph');
    if (svgElement && svg_graph) {
      const svgRect = svgElement.getBoundingClientRect();
      const xCoordinate = event.clientX - svgRect.left;
      const yCoordinate = event.clientY - svgRect.top;
      const newX = -(this.gapSizeService.getGap() * 5 - xCoordinate) / this.gapSizeService.getGap();
      const newY = (this.gapSizeService.getGap() * 5 - yCoordinate) / this.gapSizeService.getGap();
      this.hit.x = parseFloat(newX.toFixed(3))
      this.hit.y = parseFloat(newY.toFixed(3))
      this.hit.r = this.valueR
      const token = this.authService.getToken();
      const headers = { 'Authorization': token };
      this.http.post<any>('http://localhost:8080/main', this.hit, { headers }).subscribe(
        (data) => {
          this.hitCheck = data;
          console.log(data)
          // console.log('Received data:', this.hitCheck);
          this.addPoint(this.hitCheck.x, this.hitCheck.y, this.hitCheck.status, svgElement)
          this.hitCheckList.push(this.hitCheck)
        },
        (error) => {
          console.error('Error:', error);
          if (error.status === 401) {
            this.authService.logOut();
            this.nav.toStarter()
          }
        }
      )
    } else {
      this.showError()
    }


  }
  clearTable() {
    const token = this.authService.getToken();
    const headers = { 'Authorization': token };
    this.http.delete<any>('http://localhost:8080/main', { headers, observe: 'response' }).subscribe(
      (response: HttpResponse<any>) => {
        if (response.ok) {
          this.hitCheckList = []
          this.deleteAllPoints()
          this.svgResizeDirective.updateSvgElements()
        }
      },
      (error) => {
        console.error('Error:', error);
        if (error.status === 401) {
          this.authService.logOut();
          this.nav.toStarter()
        }
      }
    )
  }
  addPoint(x: number, y: number, status: string, svg: HTMLElement) {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
    const gap = this.gapSizeService.getGap()
    circle.setAttribute('cx', (x * gap + gap * 5).toString())
    circle.setAttribute('cy', (gap * 5 - y * gap).toString())
    circle.setAttribute('r', (this.gapSizeService.getGap() / 10 - 1).toString())
    if (status === 'Гном') {
      circle.setAttribute('fill', 'rgba(255, 0, 0, 0.3)')
    } else {
      circle.setAttribute('fill', 'rgba(0, 255, 0, 0.3)')
    }


    svg.appendChild(circle)
  }

  deleteAllPoints() {
    const svg = document.getElementById('svg_OXY');
    if (svg)
      while (svg.firstChild) {
        svg.removeChild(svg.firstChild);
      }
  }

  redrawPoints() {

    const svgElement = document.getElementById('svg_OXY');
    if (svgElement)
      for (const hitCheckPoint of this.hitCheckList) {

        this.addPoint(hitCheckPoint.x, hitCheckPoint.y, hitCheckPoint.status, svgElement)
      }
  }

  showError() {
    this.isError = true;
    setTimeout(() => {
      this.isError = false
    }, 2000)
  }

  postData() {
    const inputY = document.getElementById('inputY') as HTMLInputElement
    console.log(this.valueX, inputY.value)
    const svgElement = document.getElementById('svg_OXY');
    if (!isNaN(parseFloat(inputY.value)) && svgElement) {

      this.hit.x = this.valueX
      this.hit.y = parseFloat(inputY.value)
      this.hit.r = this.valueR
      const token = this.authService.getToken();
      const headers = { 'Authorization': token };
      this.http.post<any>('http://localhost:8080/main', this.hit, { headers }).subscribe(
        (data) => {
          this.hitCheck = data;
          console.log(data)
          // console.log('Received data:', this.hitCheck);
          this.addPoint(this.hitCheck.x, this.hitCheck.y, this.hitCheck.status, svgElement)
          this.hitCheckList.push(this.hitCheck)
        },
        (error) => {
          console.error('Error:', error);
          if (error.status === 401) {
            this.authService.logOut();
            this.nav.toStarter()
          }
        }
      )
    } else {
      this.showError()
    }
  }




  // showSessionEnded() {
  //   const divMessage = document.getElementById('session-ends')
  //   console.log('hi')
  //   if (divMessage) {
  //     divMessage.style.display = ''
  //     setTimeout(() => {
  //       divMessage.style.display = 'none'
  //     }, 5000)
  //   }
  // }
}
