import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTerminalDialogComponent } from './create-terminal-dialog.component';


describe('CreateTerminalDialogComponent', () => {
  let component: CreateTerminalDialogComponent;
  let fixture: ComponentFixture<CreateTerminalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateTerminalDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTerminalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
