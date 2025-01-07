import { DatePipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-pos-header',
  standalone: true,
  imports: [NgIf],
  providers: [DatePipe],
  templateUrl: './pos-header.component.html',
  styleUrl: './pos-header.component.css'
})
export class PosHeaderComponent {
  currentDate: string = '';
  isFullScreen: boolean = false;
  constructor(private datePipe: DatePipe) {}

  ngOnInit(): void {
    const now = new Date();
    // Format the date and time (e.g., 'MM/dd/yyyy hh:mm:ss a')
    this.currentDate = this.datePipe.transform(now, 'yyyy-MM-dd | hh:mm:ss a') || '';
  }

  goFullScreen(): void {
    this.isFullScreen = true;
    const element = document.documentElement; // Select the document's root element
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if ((element as any).mozRequestFullScreen) { // For Firefox
      (element as any).mozRequestFullScreen();
    } else if ((element as any).webkitRequestFullscreen) { // For Safari
      (element as any).webkitRequestFullscreen();
    } else if ((element as any).msRequestFullscreen) { // For IE/Edge
      (element as any).msRequestFullscreen();
    }
  }

  exitFullScreen(): void {
    this.isFullScreen = !true;
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).mozCancelFullScreen) { // For Firefox
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitExitFullscreen) { // For Safari
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) { // For IE/Edge
      (document as any).msExitFullscreen();
    }
  }
}
