import { Component, Inject, inject } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PageComponent } from "../page/page.component";
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FareCalculatorService } from '@jet/services/fare-calculator/fare-calculator.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RateCardComponent } from "../rate-card/rate-card.component";

@Component({
  selector: 'jet-fare-calculator-page',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    PageComponent,
    TranslocoModule, RateCardComponent, RateCardComponent],
  templateUrl: './fare-calculator-page.component.html',
  styleUrl: './fare-calculator-page.component.scss',
})
export class FareCalculatorPageComponent {
  private fareCalculatorService = inject(FareCalculatorService);

  distance: number = 0;
  isNightFare: boolean = false;
  hasLuggage: boolean = false;
  hasWaitingTime: boolean = false;
  waitingTimeMinutes: number = 0;
  calculatedFare: number | null = null;

  private readonly _loggerService = inject(LoggerService);

  public constructor() {
    this._loggerService.logComponentInitialization('RateCardComponent');
  }

  calculateFare() {
    if (this.distance >= 0) {
      this.calculatedFare = this.fareCalculatorService.calculateFare(
        this.distance,
        this.isNightFare,
        this.hasLuggage,
        this.hasWaitingTime ? this.waitingTimeMinutes : 0
      );
    }
  }

  getWaitingCharge(): number {
    return Math.round(this.waitingTimeMinutes * 1.533 * 100) / 100;
  }
}
