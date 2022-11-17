import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatDeleteTrackerModalComponent } from './boat-delete-tracker-modal.component';

describe('BoatDeleteTrackerModalComponent', () => {
  let component: BoatDeleteTrackerModalComponent;
  let fixture: ComponentFixture<BoatDeleteTrackerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatDeleteTrackerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatDeleteTrackerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
