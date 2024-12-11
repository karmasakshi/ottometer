import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutoLeaderboardComponent } from './auto-leaderboard.component';

describe('AutoLeaderboardComponent', () => {
  let component: AutoLeaderboardComponent;
  let fixture: ComponentFixture<AutoLeaderboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutoLeaderboardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AutoLeaderboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
