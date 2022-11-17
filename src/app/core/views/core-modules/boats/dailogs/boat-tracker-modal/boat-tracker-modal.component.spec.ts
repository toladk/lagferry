import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatTrackerModalComponent } from './boat-tracker-modal.component';

describe('BoatTrackerModalComponent', () => {
  let component: BoatTrackerModalComponent;
  let fixture: ComponentFixture<BoatTrackerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatTrackerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatTrackerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
