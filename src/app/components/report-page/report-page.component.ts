import { Component, inject, Signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PageComponent } from '../page/page.component';
import { ReportService } from '@jet/services/report/report.service';
import { PlateService } from '@jet/services/plate/plate.service';
import { Plate } from '@jet/interfaces/plate.interface';
import { ReportType } from '@jet/enums/report-type.enum';
import { AuthenticationService } from '@jet/services/authentication/authentication.service';
import { NewReport } from '@jet/interfaces/new-report.interface';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule, NgIf } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { FareCalculatorService } from '@jet/services/fare-calculator/fare-calculator.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'jet-report-page',
  standalone: true,
  imports: [
    MatCheckboxModule,
    CommonModule,
    NgIf,
    MatCardModule,
    MatRadioModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    PageComponent,
    TranslocoModule,
    MatSnackBarModule,
  ],
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
})
export class ReportPageComponent {
  private readonly _loggerService = inject(LoggerService);
  private reportService = inject(ReportService);
  private plateService = inject(PlateService);
  private authenticationService = inject(AuthenticationService);
  private fareService = inject(FareCalculatorService);
  private snackBar = inject(MatSnackBar);

  public plate: Signal<Plate | undefined>;

  public report: NewReport = {
    auto_plate_state_code: 'MH',
    auto_plate_district_code: '',
    auto_plate_series_code: '',
    auto_plate_vehicle_number: '',
    reporter_id: this.authenticationService.user()?.id ?? '',
    area_from: null,
    area_to: null,
    fare_difference_in_inr: 0,
    meter_distance_in_km: 0,
    meter_fare_in_inr: 0,
    meter_waiting_time_in_min: 0,
    is_tamper_indicator_on: false,
    time_in: null,
    time_out: null,
    type: ReportType.METER_CORRECT,
  };

  public constructor() {
    this.plate = this.plateService.plate;
    this._loggerService.logComponentInitialization('ReportPageComponent');
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.reportService
        .insertReport(this.report)
        // @ts-ignore
        .then(({ data, error }) => {
          if (error) {
            this.snackBar.open(
              'Error submitting report. Please try again.',
              'Close',
              {
                duration: 3000,
              },
            );
          } else {
            console.log(data);
            this.snackBar.open('Report submitted successfully!', 'Close', {
              duration: 3000,
            });
          }
        });
    }
  }

  calculateFareDifference(): void {
    if (this.report.meter_distance_in_km && this.report.meter_fare_in_inr) {
      const expectedFare = this.fareService.calculateFare(
        this.report.meter_distance_in_km,
        false, // isNightFare
        false, // hasLuggage
        this.report.meter_waiting_time_in_min ?? 0,
      );

      this.report.fare_difference_in_inr =
        this.report.meter_fare_in_inr - expectedFare;

      console.log('Fare calculation:', {
        distance: this.report.meter_distance_in_km,
        waitingTime: this.report.meter_waiting_time_in_min,
        meterFare: this.report.meter_fare_in_inr,
        expectedFare: expectedFare,
        difference: this.report.fare_difference_in_inr,
      });
    }
  }
}
