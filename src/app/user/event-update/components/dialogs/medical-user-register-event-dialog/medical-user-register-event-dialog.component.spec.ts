import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalUserRegisterEventDialogComponent } from './medical-user-register-event-dialog.component';

describe('MedicalUserRegisterEventDialogComponent', () => {
  let component: MedicalUserRegisterEventDialogComponent;
  let fixture: ComponentFixture<MedicalUserRegisterEventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalUserRegisterEventDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalUserRegisterEventDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
