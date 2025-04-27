import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeAdminDialogComponent } from './change-admin-dialog.component';

describe('ChangeAdminDialogComponent', () => {
  let component: ChangeAdminDialogComponent;
  let fixture: ComponentFixture<ChangeAdminDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChangeAdminDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeAdminDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
