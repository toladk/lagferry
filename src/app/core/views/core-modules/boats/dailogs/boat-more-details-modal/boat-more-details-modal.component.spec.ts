import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoatMoreDetailsModalComponent } from './boat-more-details-modal.component';

describe('BoatMoreDetailsModalComponent', () => {
  let component: BoatMoreDetailsModalComponent;
  let fixture: ComponentFixture<BoatMoreDetailsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoatMoreDetailsModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoatMoreDetailsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
