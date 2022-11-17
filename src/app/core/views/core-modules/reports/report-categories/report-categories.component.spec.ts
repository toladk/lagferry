import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCategoriesComponent } from './report-categories.component';

describe('ReportCategoriesComponent', () => {
  let component: ReportCategoriesComponent;
  let fixture: ComponentFixture<ReportCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportCategoriesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
