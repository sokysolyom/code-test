import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractDialogComponent } from './abstract-dialog.component';

describe('AbstractDialogComponent', () => {
  let component: AbstractDialogComponent;
  let fixture: ComponentFixture<AbstractDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbstractDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AbstractDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
