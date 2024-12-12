import { Component, inject, OnInit } from '@angular/core';
import { LeaderboardService } from '@jet/services/leaderboard/leaderboard.service';
import { LoggerService } from '@jet/services/logger/logger.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'jet-home-page',
  standalone: true,
  imports: [TranslocoModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
})
export class HomePageComponent implements OnInit {
  private readonly _leaderboardService = inject(LeaderboardService);
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
    this._leaderboardService.selectLeaderboardTopFairAutos()
    .then((response)=>{
      // @ts-ignoretsgnore
      this.topFairAutos = response.data;
    })
  }

  public getTopReporters():void {
    this._leaderboardService.selectLeaderboardTopReporters()
    .then((response)=>{
      // @ts-ignore
      this.topReporters = response.data;
    })
  }


  public getTopUnfairAutos():void {
    this._leaderboardService.selectLeaderboardTopUnfairAutos()
    .then((response)=>{
      // @ts-ignore
      this.topUnfairAutos = response.data;
    })
  }
}
