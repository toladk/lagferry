import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReportCategoryModalComponent } from './update-report-category-modal.component';

describe('UpdateReportCategoryModalComponent', () => {
  let component: UpdateReportCategoryModalComponent;
  let fixture: ComponentFixture<UpdateReportCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateReportCategoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateReportCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
