import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBoatModalComponent } from './add-boat-modal.component';

describe('AddBoatModalComponent', () => {
  let component: AddBoatModalComponent;
  let fixture: ComponentFixture<AddBoatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddBoatModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBoatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
