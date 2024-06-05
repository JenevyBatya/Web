import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDrawFigures]'
})
export class DrawFiguresDirective {
  @Input() radius: number = 0
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  gapSize: number = 0;
  ngAfterViewInit(): void {
    this.updateSvgElements();
    this.createQuarterShape()

  }
  //Изменение отрисовки фигур при движении полхунка выбора
  ngOnChanges() {
    this.createQuarterShape()

  }
  //Слушатель на событие изменения размера окна
  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event): void {
  //   this.updateSvgElements();
  //   this.createQuarterShape()
    
  // }

  public updateSvgElements(): void {
    const windowWidth = window.innerWidth;
    const svgElement = this.el.nativeElement;


    this.clearSvgElements();



    if (windowWidth >= 1193) {
      this.gapSize = 50;

    } else if (windowWidth <= 1193 && windowWidth >= 774) {
      this.gapSize = 34.4
    } else {
      this.gapSize = 30
    }

    this.renderer.setAttribute(svgElement, 'width', (this.gapSize * 10).toString());
    this.renderer.setAttribute(svgElement, 'height', (this.gapSize * 10).toString());





  }
  private clearSvgElements(): void {
    const svgElement = this.el.nativeElement;
    while (svgElement.firstChild) {
      this.renderer.removeChild(svgElement, svgElement.firstChild);
    }
  }

  public createQuarterShape(): void {
    const x = this.gapSize * 5
    const y = this.gapSize * 5
    const rad = this.radius * this.gapSize
    const fill = '#1b245e'
    const svgElement = this.el.nativeElement;
    // console.log(svgElement, this.gapSize, x,y,rad)
    this.clearSvgElements();

    // 1. Рисуем четверть круга
    const quarterCircle = this.renderer.createElement('path', 'svg');
    const pathData = this.getQuarterArcPath(x, y, rad / 2);
    this.renderer.setAttribute(quarterCircle, 'd', pathData);
    this.renderer.setAttribute(quarterCircle, 'fill', fill);
    this.renderer.appendChild(svgElement, quarterCircle);

    // 2. Рисуем треугольник
    const triangle = this.renderer.createElement('polygon', 'svg');
    const trianglePoints = this.getTrianglePoints(x, y, rad);
    this.renderer.setAttribute(triangle, 'points', trianglePoints);
    this.renderer.setAttribute(triangle, 'fill', fill);
    this.renderer.appendChild(svgElement, triangle);

    // 3. Рисуем квадрат
    const square = this.renderer.createElement('rect', 'svg');
    const squareAttributes = this.getSquareAttributes(x, y, rad);
    this.renderer.setAttribute(square, 'x', squareAttributes.x.toString());
    this.renderer.setAttribute(square, 'y', squareAttributes.y.toString());
    this.renderer.setAttribute(square, 'width', squareAttributes.width.toString());
    this.renderer.setAttribute(square, 'height', squareAttributes.height.toString());
    this.renderer.setAttribute(square, 'fill', fill);
    this.renderer.appendChild(svgElement, square);
  }

  private getQuarterArcPath(x: number, y: number, radius: number): string {
    const startAngle = 180;
    const endAngle = 270;
    const largeArcFlag = 0;
    const sweepFlag = 1;
    const startX = x + radius * Math.cos(startAngle * (Math.PI / 180));
    const startY = y + radius * Math.sin(startAngle * (Math.PI / 180));
    const endX = x + radius * Math.cos(endAngle * (Math.PI / 180));
    const endY = y + radius * Math.sin(endAngle * (Math.PI / 180));

    return `M ${x} ${y} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${endX} ${endY} Z`;
  }

  private getTrianglePoints(cx: number, cy: number, sideLength: number): string {

    const x1 = cx + sideLength;
    const y1 = cy;

    const x2 = cx;
    const y2 = cy + sideLength / 2;

    const x3 = cx;
    const y3 = cy;

    return `${x1},${y1} ${x2},${y2} ${x3},${y3}`;
  }

  private getSquareAttributes(cx: number, cy: number, sideLength: number): { x: number; y: number; width: number; height: number } {
    const halfSide = sideLength / 2;

    const x = cx - sideLength;
    const y = cy;

    return { x, y, width: sideLength, height: sideLength };
  }

}
