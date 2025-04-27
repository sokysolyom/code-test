import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentativeRegisterDialogComponent } from './representative-register-dialog.component';

describe('RepresentativeRegisterDialogComponent', () => {
  let component: RepresentativeRegisterDialogComponent;
  let fixture: ComponentFixture<RepresentativeRegisterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentativeRegisterDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentativeRegisterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
