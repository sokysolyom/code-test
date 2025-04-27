import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MedicalUserRegisterDialogComponent } from './medical-user-register-dialog.component';

describe('MedicalUserRegisterDialogComponent', () => {
  let component: MedicalUserRegisterDialogComponent;
  let fixture: ComponentFixture<MedicalUserRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicalUserRegisterDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MedicalUserRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
