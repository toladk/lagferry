import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRouteModalComponent } from './update-route-modal.component';

describe('UpdateRouteModalComponent', () => {
  let component: UpdateRouteModalComponent;
  let fixture: ComponentFixture<UpdateRouteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRouteModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateRouteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
