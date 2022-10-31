import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCameraModalComponent } from './add-camera-modal.component';

describe('AddCameraModalComponent', () => {
  let component: AddCameraModalComponent;
  let fixture: ComponentFixture<AddCameraModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCameraModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCameraModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
