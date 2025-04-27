import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisteredUsersCustomTableComponent } from './registered-users-custom-table.component';

describe('RegisteredUsersCustomTableComponent', () => {
  let component: RegisteredUsersCustomTableComponent;
  let fixture: ComponentFixture<RegisteredUsersCustomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisteredUsersCustomTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RegisteredUsersCustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
