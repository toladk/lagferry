import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReportCategoryModalComponent } from './create-report-category-modal.component';

describe('CreateReportCategoryModalComponent', () => {
  let component: CreateReportCategoryModalComponent;
  let fixture: ComponentFixture<CreateReportCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReportCategoryModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReportCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
