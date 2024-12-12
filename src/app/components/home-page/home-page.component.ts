import { NgOptimizedImage, NgStyle } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { LeaderboardsService } from '@jet/services/leaderboards/leaderboards.service';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';
import { PageComponent } from '../page/page.component';

@Component({
  selector: 'jet-home-page',
  standalone: true,
  imports: [
    MatProgressBarModule,
    NgOptimizedImage,
    MatCardModule,
    RouterLink,
    MatButtonModule,
    NgStyle,
    TranslocoModule,
    MatTableModule,
    PageComponent
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly _leaderboardsService = inject(LeaderboardsService);
  private readonly _loggerService = inject(LoggerService);

  public isGetTopFairAutosPending: boolean;
  public isGetTopReportersPending: boolean;
  public isGetTopUnfairAutosPending: boolean;
  public topFairAutos: Record<string, unknown>[]
  public topReporters: Record<string, unknown>[]
  public topUnfairAutos: Record<string, unknown>[]

  public constructor() {
    this.isGetTopFairAutosPending = false;

    this.isGetTopReportersPending = false;

    this.isGetTopUnfairAutosPending = false;

    this.topFairAutos = [];
    
    this.topReporters = [];
    
    this.topUnfairAutos = [];

    this._loggerService.logComponentInitialization('HomePageComponent');
  }

  public ngOnInit(): void {
    this.getTopFairAutos();
    this.getTopReporters();
    this.getTopUnfairAutos();
  }

  public getTopFairAutos():void {
    this.isGetTopFairAutosPending = true;

    this._leaderboardsService.getLeaderboardTopFairAutos()
    .then((response)=>{
      this.isGetTopFairAutosPending = false;

      // @ts-ignoretsgnore
      this.topFairAutos = response.data;

      console.log(this.topFairAutos)
    })
  }

  public getTopReporters():void {
    this.isGetTopReportersPending = true;

    this._leaderboardsService.getLeaderboardTopReporters()
    .then((response)=>{
      this.isGetTopReportersPending = false;

      // @ts-ignore
      this.topReporters = response.data;

      console.log(this.topReporters);
    })
  }

  public getTopUnfairAutos():void {
    this.isGetTopUnfairAutosPending = true;

    this._leaderboardsService.getLeaderboardTopUnfairAutos()
    .then((response)=>{
      this.isGetTopUnfairAutosPending = false;

      // @ts-ignore
      this.topUnfairAutos = response.data;

      console.log(this.topReporters);
    })
  }
}
