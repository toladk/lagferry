import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoatCameraModalComponent } from './add-boat-camera-modal.component';

describe('AddBoatCameraModalComponent', () => {
  let component: AddBoatCameraModalComponent;
  let fixture: ComponentFixture<AddBoatCameraModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoatCameraModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoatCameraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
