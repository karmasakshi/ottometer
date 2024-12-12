import { NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { LeaderboardsService } from '@jet/services/leaderboards/leaderboards.service';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-home-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    RouterLink,
    MatButtonModule,
    TranslocoModule
  ],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly _leaderboardsService = inject(LeaderboardsService);
  private readonly _loggerService = inject(LoggerService);

  public topFairAutos: Record<string, unknown>[]
  public topReporters: Record<string, unknown>[]
  public topUnfairAutos: Record<string, unknown>[]

  public constructor() {
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
    this._leaderboardsService.getLeaderboardTopFairAutos()
    .then((response)=>{
      // @ts-ignoretsgnore
      this.topFairAutos = response.data;
    })
  }

  public getTopReporters():void {
    this._leaderboardsService.getLeaderboardTopReporters()
    .then((response)=>{
      // @ts-ignore
      this.topReporters = response.data;
    })
  }


  public getTopUnfairAutos():void {
    this._leaderboardsService.getLeaderboardTopUnfairAutos()
    .then((response)=>{
      // @ts-ignore
      this.topUnfairAutos = response.data;
    })
  }
}
