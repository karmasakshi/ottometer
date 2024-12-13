import { inject, Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';

@Injectable({
  providedIn: 'root',
})
export class FareCalculatorService {
  private readonly _loggerService = inject(LoggerService);

  private readonly MINIMUM_FARE = 23;
  private readonly PER_KM_RATE = 15.33;
  private readonly NIGHT_FARE_MULTIPLIER = 1.25;
  private readonly LUGGAGE_CHARGE = 6;
  private readonly WAITING_RATE_PER_MINUTE = 1.533; // 10% of per km rate

  public constructor() {
    this._loggerService.logServiceInitialization('FareCalculatorService');
  }

  calculateFare(
    distance: number,
    isNightFare: boolean,
    hasLuggage: boolean,
    waitingMinutes: number = 0,
  ): number {
    let fare: number;

    if (distance <= 1.5) {
      fare = this.MINIMUM_FARE;
    } else {
      fare = this.MINIMUM_FARE + (distance - 1.5) * this.PER_KM_RATE;
    }

    // Add waiting time charge
    if (waitingMinutes > 0) {
      fare += waitingMinutes * this.WAITING_RATE_PER_MINUTE;
    }

    // Round to nearest rupee (0.5 and above rounds up, below 0.5 rounds down)
    fare = Math.round(fare);

    if (isNightFare) {
      fare = Math.round(fare * this.NIGHT_FARE_MULTIPLIER);
    }

    if (hasLuggage) {
      fare += this.LUGGAGE_CHARGE;
    }

    return fare;
  }
}
