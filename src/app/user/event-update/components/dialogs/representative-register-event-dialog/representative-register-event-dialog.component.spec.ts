import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RepresentativeRegisterEventDialogComponent } from './representative-register-event-dialog.component';

describe('RepresentativeRegisterEventDialogComponent', () => {
  let component: RepresentativeRegisterEventDialogComponent;
  let fixture: ComponentFixture<RepresentativeRegisterEventDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepresentativeRegisterEventDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(
      RepresentativeRegisterEventDialogComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
