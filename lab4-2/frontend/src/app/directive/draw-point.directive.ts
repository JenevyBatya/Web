import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDrawPoint]'
})
export class DrawPointDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }
  ngAfterViewInit(): void {
    
    this.renderer.listen(this.el.nativeElement, 'click', (event) => {
      console.log('clicks')
      const clickX = event.clientX;
      const clickY = event.clientY;
    })
  }

}
