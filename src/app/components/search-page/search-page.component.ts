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
  Validators,
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
  displayedColumns: string[] = [
    'plateNumber',
    'negreport',
    'posreport',
    'totreport',
    'firstReport',
    'lastReport',
  ];
  isLoading: boolean = false;
  hasSearched = false;

  public constructor() {
    this.plate = this.plateService.plate;
    this.plateForm = this._formBuilder.group({
      state_code: { value: 'MH', disabled: true },
      district_code: ['', [Validators.required, Validators.pattern('[0-9]{2}')]],
      series_code: ['', [Validators.required, Validators.pattern('[A-Za-z]{2}')]],
      vehicle_number: ['', [Validators.required, Validators.pattern('[0-9]{4}')]],
    });

    this._loggerService.logComponentInitialization('SearchPageComponent');
  }

  onSearch() {
    this.isLoading = true;
    this.autoservice
      .getAuto({
        state_code: this.plateForm.controls.state_code.value ?? '',
        district_code: this.plateForm.controls.district_code.value ?? '',
        series_code: this.plateForm.controls.series_code.value ?? '',
        vehicle_number: this.plateForm.controls.vehicle_number.value ?? '',
      })
      // @ts-ignore
      .then(({data, error}) => {
        if(error){
          console.error('Error during auto search:', error);
        this.isLoading = false;
        this.hasSearched = true;
        this.searchResults = [];
        }
        // @ts-ignore
        this.searchResults = data;
        this.isLoading = false;
        this.hasSearched = true;
        console.log('Search completed successfully:', {
          resultsCount: this.searchResults.length,
          results: this.searchResults
        });
      })

  }
}
