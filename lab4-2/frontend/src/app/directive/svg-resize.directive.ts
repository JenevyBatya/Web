import { Directive, ElementRef, Renderer2, AfterViewInit, HostListener, Input } from '@angular/core';
import { GapSizeService } from '../service/gap-size.service';

@Directive({
  selector: '[appSvgResize]',

})
export class SvgResizeDirective {
  @Input() radius: number = 0

  constructor(private el: ElementRef, private renderer: Renderer2, private gapSizeService: GapSizeService) { }
  fontSize: number = 0;
  gapSize: number = 0;

  ngAfterViewInit(): void {
    // this.updateSvgElements();
  }


  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event): void {
  //   this.updateSvgElements();
  // }

  public updateSvgElements(): void {
    const windowWidth = window.innerWidth;
    const svgElement = this.el.nativeElement;


    this.clearSvgElements();



    if (windowWidth >= 1193) {
      this.gapSize = 50;
      this.fontSize = 12;

    } else if (windowWidth <= 1193 && windowWidth >= 774) {
      this.gapSize = 34.4
      this.fontSize = 10
    } else {
      this.gapSize = 30
      this.fontSize = 8
    }
    this.gapSizeService.updateGap(this.gapSize)
    this.renderer.setAttribute(svgElement, 'width', (this.gapSize * 10).toString());
    this.renderer.setAttribute(svgElement, 'height', (this.gapSize * 10).toString());


    this.createLine(0, this.gapSize * 5, this.gapSize * 10, this.gapSize * 5, 'white');
    this.createText(0, this.gapSize * 5 - 10, '-5', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize, this.gapSize * 5 - 10, '-4', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 2, this.gapSize * 5 - 10, '-3', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 3, this.gapSize * 5 - 10, '-2', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 4, this.gapSize * 5 - 10, '-1', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 6, this.gapSize * 5 - 10, '1', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 7, this.gapSize * 5 - 10, '2', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 8, this.gapSize * 5 - 10, '3', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 9, this.gapSize * 5 - 10, '4', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 10, this.gapSize * 5 - 10, '5', 'middle', 'white', this.fontSize);


    this.createLine(this.gapSize * 5, 0, this.gapSize * 5, this.gapSize * 10, 'white');
    this.createText(this.gapSize * 5 - 10, 0, '5', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 5 - 10, this.gapSize, '4', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 5 - 10, this.gapSize * 2, '3', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 5 - 10, this.gapSize * 3, '2', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 5 - 10, this.gapSize * 4, '1', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 5 - 10, this.gapSize * 6, '-1', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 5 - 10, this.gapSize * 7, '-2', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 5 - 10, this.gapSize * 8, '-3', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 5 - 10, this.gapSize * 9, '-4', 'middle', 'white', this.fontSize);
    this.createText(this.gapSize * 5 - 10, this.gapSize * 10, '-5', 'middle', 'white', this.fontSize);



  }

  private clearSvgElements(): void {
    const svgElement = this.el.nativeElement;
    while (svgElement.firstChild) {
      this.renderer.removeChild(svgElement, svgElement.firstChild);
    }
  }

  private createLine(x1: number, y1: number, x2: number, y2: number, stroke: string): void {
    const line = this.renderer.createElement('line', 'svg');
    this.renderer.setAttribute(line, 'x1', x1.toString());
    this.renderer.setAttribute(line, 'y1', y1.toString());
    this.renderer.setAttribute(line, 'x2', x2.toString());
    this.renderer.setAttribute(line, 'y2', y2.toString());
    this.renderer.setAttribute(line, 'stroke', stroke);
    this.renderer.appendChild(this.el.nativeElement, line);
  }

  private createText(x: number, y: number, content: string, anchor: string, fill: string, fontSize: number): void {
    const text = this.renderer.createElement('text', 'svg');
    this.renderer.setAttribute(text, 'x', x.toString());
    this.renderer.setAttribute(text, 'y', y.toString());
    this.renderer.setAttribute(text, 'text-anchor', anchor);
    this.renderer.setAttribute(text, 'fill', fill);
    this.renderer.setAttribute(text, 'font-size', fontSize.toString());
    this.renderer.appendChild(text, this.renderer.createText(content));
    this.renderer.appendChild(this.el.nativeElement, text);
  }


}
