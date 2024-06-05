import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GapSizeService {

  private gapSize: number = 0;

  constructor() {
    const i = localStorage.getItem('gapSize')
    if (i !== null) {
      this.gapSize = parseInt(i, 10)

    }
  }
  updateGap(newGapSize: number): void {
    this.gapSize = newGapSize;

    localStorage.setItem('gapSize', newGapSize.toString())
  }

  getGap(): number {
    return this.gapSize;
  }

  logOut(): void {
    localStorage.removeItem('gapSize');
    this.gapSize = 0;

  }
}
