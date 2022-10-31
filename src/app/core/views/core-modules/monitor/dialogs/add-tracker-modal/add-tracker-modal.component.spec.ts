import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTrackerModalComponent } from './add-tracker-modal.component';

describe('AddTrackerModalComponent', () => {
  let component: AddTrackerModalComponent;
  let fixture: ComponentFixture<AddTrackerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTrackerModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTrackerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
