import { Component, inject, OnInit, Signal } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PageComponent } from '../page/page.component';
import { CommonModule, DatePipe, NgStyle } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { PlateService } from '@jet/services/plate/plate.service';
import { AutoService } from '@jet/services/auto/auto.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Auto } from '@jet/interfaces/auto.interface';
import { Plate } from '@jet/interfaces/plate.interface';

@Component({
  selector: 'jet-search-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    DatePipe,
    NgStyle,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatChipsModule,
    MatIconModule,
    MatProgressBarModule,
    PageComponent,
    TranslocoModule,
  ],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.scss',
})
export class SearchPageComponent {
  private readonly _loggerService = inject(LoggerService);
  private readonly _formBuilder = inject(FormBuilder);
  private plateService = inject(PlateService);
  private autoservice = inject(AutoService);

  public plate: Signal<Plate | undefined>;
  public plateForm: FormGroup<{
    state_code: FormControl<string | null>;
    district_code: FormControl<string | null>;
    series_code: FormControl<string | null>;
    vehicle_number: FormControl<string | null>;
  }>;
  searchResults: Auto[] = [];
  displayedColumns: string[] = ['plateNumber', 'firstReport', 'lastReport'];
  isLoading: boolean = false;
  hasSearched = false;

  public constructor() {
    this.plate = this.plateService.plate;
    this.plateForm = this._formBuilder.group({
      state_code: this.plate()?.state_code ?? '',
      district_code: this.plate()?.district_code ?? '',
      series_code: this.plate()?.series_code ?? '',
      vehicle_number: this.plate()?.vehicle_number ?? '',
    });

    this._loggerService.logComponentInitialization('SearchPageComponent');
  }

  onSearch() {
    this.isLoading = true;
    this.autoservice
      .getAuto({
        state_code:
          this.plateForm.controls.state_code.value?.toUpperCase() ?? '',
        district_code: this.plateForm.controls.district_code.value ?? '',
        series_code:
          this.plateForm.controls.series_code.value?.toUpperCase() ?? '',
        vehicle_number: this.plateForm.controls.vehicle_number.value ?? '',
      })
      .then((response) => {
        // @ts-ignore
        const auto: Auto = response.data;
        if(auto) {this.searchResults.push(auto)};
        this.isLoading = false;
        this.hasSearched = true;
      });
  }
}
