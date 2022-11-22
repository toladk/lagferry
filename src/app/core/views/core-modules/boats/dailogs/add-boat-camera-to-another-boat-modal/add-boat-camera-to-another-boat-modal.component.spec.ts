import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoatCameraToAnotherBoatModalComponent } from './add-boat-camera-to-another-boat-modal.component';

describe('AddBoatCameraToAnotherBoatModalComponent', () => {
  let component: AddBoatCameraToAnotherBoatModalComponent;
  let fixture: ComponentFixture<AddBoatCameraToAnotherBoatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoatCameraToAnotherBoatModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoatCameraToAnotherBoatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
