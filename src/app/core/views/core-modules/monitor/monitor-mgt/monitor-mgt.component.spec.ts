import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonitorMgtComponent } from './monitor-mgt.component';

describe('MonitorMgtComponent', () => {
  let component: MonitorMgtComponent;
  let fixture: ComponentFixture<MonitorMgtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MonitorMgtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MonitorMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
