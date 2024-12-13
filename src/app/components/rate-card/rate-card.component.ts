import { Component, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PageComponent } from '../page/page.component';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';

interface RateCard {
  distance: number;
  regularFare: number;
  midnightFare: number;
}

 interface FareNote {
  text: string;
}

const fareData = [
  { distance: 1.50, regularFare: 23, midnightFare: 29 },
  { distance: 1.60, regularFare: 25, midnightFare: 31 },
  { distance: 1.70, regularFare: 26, midnightFare: 33 },
  { distance: 1.80, regularFare: 28, midnightFare: 34 },
  { distance: 1.90, regularFare: 29, midnightFare: 36 },
  { distance: 2.00, regularFare: 31, midnightFare: 38 },
  { distance: 2.10, regularFare: 32, midnightFare: 40 },
  { distance: 2.20, regularFare: 34, midnightFare: 42 },
  { distance: 2.30, regularFare: 35, midnightFare: 44 },
  { distance: 2.40, regularFare: 37, midnightFare: 46 },
  { distance: 2.50, regularFare: 38, midnightFare: 48 },
  { distance: 2.60, regularFare: 40, midnightFare: 50 },
  { distance: 2.70, regularFare: 41, midnightFare: 52 },
  { distance: 2.80, regularFare: 43, midnightFare: 54 },
  { distance: 2.90, regularFare: 44, midnightFare: 56 },
  { distance: 3.00, regularFare: 46, midnightFare: 57 },
  { distance: 3.10, regularFare: 48, midnightFare: 59 },
  { distance: 3.20, regularFare: 49, midnightFare: 61 },
  { distance: 3.30, regularFare: 51, midnightFare: 63 },
  { distance: 3.40, regularFare: 52, midnightFare: 65 },
  { distance: 3.50, regularFare: 54, midnightFare: 67 },
  { distance: 3.60, regularFare: 55, midnightFare: 69 },
  { distance: 3.70, regularFare: 57, midnightFare: 71 },
  { distance: 3.80, regularFare: 58, midnightFare: 73 },
  { distance: 3.90, regularFare: 60, midnightFare: 75 },
  { distance: 4.00, regularFare: 61, midnightFare: 77 },
  { distance: 4.10, regularFare: 63, midnightFare: 79 },
  { distance: 4.20, regularFare: 64, midnightFare: 80 },
  { distance: 4.30, regularFare: 66, midnightFare: 82 },
  { distance: 4.40, regularFare: 67, midnightFare: 84 },
  { distance: 4.50, regularFare: 69, midnightFare: 86 },
  { distance: 4.60, regularFare: 71, midnightFare: 88 },
  { distance: 4.70, regularFare: 72, midnightFare: 90 },
  { distance: 4.80, regularFare: 74, midnightFare: 92 },
  { distance: 4.90, regularFare: 75, midnightFare: 94 },
  { distance: 5.00, regularFare: 77, midnightFare: 96 },
  { distance: 5.10, regularFare: 78, midnightFare: 98 },
  { distance: 5.20, regularFare: 80, midnightFare: 100 },
  { distance: 5.30, regularFare: 81, midnightFare: 102 },
  { distance: 5.40, regularFare: 83, midnightFare: 103 },
  { distance: 5.50, regularFare: 84, midnightFare: 105 },
  { distance: 5.60, regularFare: 86, midnightFare: 107 },
  { distance: 5.70, regularFare: 87, midnightFare: 109 },
  { distance: 5.80, regularFare: 89, midnightFare: 111 },
  { distance: 5.90, regularFare: 90, midnightFare: 113 },
  { distance: 6.00, regularFare: 92, midnightFare: 115 },
  { distance: 6.10, regularFare: 94, midnightFare: 117 },
  { distance: 6.20, regularFare: 95, midnightFare: 119 },
  { distance: 6.30, regularFare: 97, midnightFare: 121 },
  { distance: 6.40, regularFare: 98, midnightFare: 123 },
  { distance: 6.50, regularFare: 100, midnightFare: 125 },
  { distance: 6.60, regularFare: 101, midnightFare: 126 },
  { distance: 6.70, regularFare: 103, midnightFare: 128 },
  { distance: 6.80, regularFare: 104, midnightFare: 130 },
  { distance: 6.90, regularFare: 106, midnightFare: 132 },
  { distance: 7.00, regularFare: 107, midnightFare: 134 },
  { distance: 7.10, regularFare: 109, midnightFare: 136 },
  { distance: 7.20, regularFare: 110, midnightFare: 138 },
  { distance: 7.30, regularFare: 112, midnightFare: 140 },
  { distance: 7.40, regularFare: 113, midnightFare: 142 },
  { distance: 7.50, regularFare: 115, midnightFare: 144 },
  { distance: 7.60, regularFare: 116, midnightFare: 146 },
  { distance: 7.70, regularFare: 118, midnightFare: 148 },
  { distance: 7.80, regularFare: 120, midnightFare: 149 },
  { distance: 7.90, regularFare: 121, midnightFare: 151 },
  { distance: 8.00, regularFare: 123, midnightFare: 153 },
  { distance: 8.10, regularFare: 124, midnightFare: 155 },
  { distance: 8.20, regularFare: 126, midnightFare: 157 },
  { distance: 8.30, regularFare: 127, midnightFare: 159 },
  { distance: 8.40, regularFare: 129, midnightFare: 161 },
  { distance: 8.50, regularFare: 130, midnightFare: 163 },
  { distance: 8.60, regularFare: 132, midnightFare: 165 },
  { distance: 8.70, regularFare: 133, midnightFare: 167 },
  { distance: 8.80, regularFare: 135, midnightFare: 169 },
  { distance: 8.90, regularFare: 136, midnightFare: 171 },
  { distance: 9.00, regularFare: 138, midnightFare: 172 },
  { distance: 9.10, regularFare: 140, midnightFare: 174 },
  { distance: 9.20, regularFare: 141, midnightFare: 176 }
];

const fareNotes = [
  { text: 'For Mumbai Region effective from 1-Oct-2022' },
  { text: 'Minimum Fare for 1.5 km Rs. 23' },
  { text: 'Subsequent KM Rs. 15.33 per KM (Rounded off to nearest Rupee)' },
  { text: '25% additional fare for journey from 12.00 midnight to 5:00am' },
  { text: 'Complaints: 1800-22-0110' }
];

@Component({
  selector: 'jet-rate-card',
  standalone: true,
  imports: [ CommonModule,
    MatCardModule,
    MatTableModule,
    MatSlideToggleModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
  TranslocoModule,
PageComponent],
  templateUrl: './rate-card.component.html',
  styleUrl: './rate-card.component.scss',
})
export class RateCardComponent {
  private readonly _loggerService = inject(LoggerService);

  rates: RateCard[] = fareData;
  notes: FareNote[] = fareNotes;
  displayedColumns: string[] = ['distance', 'fare'];
  isNightFare = this.isNightTime();
  currentTime = new Date();

  public constructor() {
    this._loggerService.logComponentInitialization('RateCardComponent');
  }

  isNightTime(): boolean{
     const hours = new Date().getHours();
    return hours >= 0 && hours < 5;
  }

}
