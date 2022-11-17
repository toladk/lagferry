import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoatCrewModalComponent } from './add-boat-crew-modal.component';

describe('AddBoatCrewModalComponent', () => {
  let component: AddBoatCrewModalComponent;
  let fixture: ComponentFixture<AddBoatCrewModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoatCrewModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoatCrewModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
