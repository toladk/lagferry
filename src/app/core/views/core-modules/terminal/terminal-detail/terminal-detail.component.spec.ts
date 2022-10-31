import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalDetailComponent } from './terminal-detail.component';

describe('TerminalDetailComponent', () => {
  let component: TerminalDetailComponent;
  let fixture: ComponentFixture<TerminalDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TerminalDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TerminalDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
