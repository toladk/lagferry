import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportMgtComponent } from './report-mgt.component';

describe('ReportMgtComponent', () => {
  let component: ReportMgtComponent;
  let fixture: ComponentFixture<ReportMgtComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportMgtComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportMgtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
