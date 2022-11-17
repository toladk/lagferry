import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBoatModalComponent } from './edit-boat-modal.component';

describe('EditBoatModalComponent', () => {
  let component: EditBoatModalComponent;
  let fixture: ComponentFixture<EditBoatModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditBoatModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBoatModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
