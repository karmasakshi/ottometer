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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'jet-report-page',
  standalone: true,
  imports: [
    MatCheckboxModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    PageComponent,
    TranslocoModule,
  ],
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss'],
})
export class ReportPageComponent {
  private readonly _loggerService = inject(LoggerService);
  private reportService = inject(ReportService);
  private plateService = inject(PlateService);
  private authenticationService = inject(AuthenticationService);

  public plate: Signal<Plate | undefined>;

  public report: NewReport = {
    auto_plate_state_code: '',
    auto_plate_district_code: '',
    auto_plate_series_code: '',
    auto_plate_vehicle_number: '',
    reporter_id: this.authenticationService.user()?.id ?? '',
    area_from: '',
    area_to: '',
    fare_difference_in_inr: 0,
    meter_distance_in_km: 0,
    meter_fare_in_inr: 0,
    meter_waiting_time_in_min: 0,
    is_tamper_indicator_on: false,
    time_in: '',
    time_out: '',
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
        .then((respose) => {
          console.log(respose)
        })
    }
  }
}
