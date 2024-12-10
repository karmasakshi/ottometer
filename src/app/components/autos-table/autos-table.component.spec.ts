import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutosTableComponent } from './autos-table.component';

describe('AutosTableComponent', () => {
  let component: AutosTableComponent;
  let fixture: ComponentFixture<AutosTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutosTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutosTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
