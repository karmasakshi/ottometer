import { Component, inject, OnInit } from '@angular/core';
import { LoggerService } from '@jet/services/logger/logger.service';
import { ReportService } from '@jet/services/report/report.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PageComponent } from '../page/page.component';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Report } from '@jet/interfaces/report.interface';
import { ReportType } from '@jet/enums/report-type.enum';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@Component({
  selector: 'jet-report-history-page',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatPaginatorModule,
    MatCardModule,
    MatProgressBarModule,
    MatChipsModule,
    MatIconModule,
    PageComponent,
    TranslocoModule,
  ],
  templateUrl: './report-history-page.component.html',
  styleUrl: './report-history-page.component.scss',
})
export class ReportHistoryPageComponent implements OnInit {
  private readonly _loggerService = inject(LoggerService);
  private readonly _reportService = inject(ReportService);

  counts: { total: number; correct: number; incorrect: number } = {
    total: 0,
    correct: 0,
    incorrect: 0,
  };
  reports: Report[] = [];
  displayedColumns = [
    'date',
    'plateNumber',
    'route',
    'time',
    'type',
    'distance',
    'fare',
    'difference',
  ];
  pageSize = 10;
  currentPage = 0;
  totalReports = 0;
  selectedFilter: ReportType | null = null;
  loading = false;

  public constructor() {
    this._loggerService.logComponentInitialization(
      'ReportHistoryPageComponent',
    );
  }

  public ngOnInit(): void {
    this.getReports();
  }

  public getReports(): void {
    this.loading = true;
    this._reportService
      .getReports(this.currentPage, this.pageSize, this.selectedFilter)
      .then((response): void => {
        // @ts-ignore
        this.reports = response.data;
        console.log(response);
        // @ts-ignore
        this.totalReports = response.data[0]?.total_count;
        this.counts = {
          // @ts-ignore
          total: response.data[0]?.total_count ?? 0,
          // @ts-ignore
          correct: response.data[0]?.meter_correct_count ?? 0,
          // @ts-ignore
          incorrect: response.data[0]?.meter_incorrect_count ?? 0,
        };
        this.loading = false;
      });
  }

  onPageChange(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getReports();
  }
  onFilterChange(filter: ReportType | null) {
    this.selectedFilter = filter;
    this.currentPage = 0;
    this.reports = [];
    this.getReports();
  }
}
