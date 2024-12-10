import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContributorsTableComponent } from './top-contributors-table.component';

describe('TopContributorsTableComponent', () => {
  let component: TopContributorsTableComponent;
  let fixture: ComponentFixture<TopContributorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopContributorsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopContributorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
