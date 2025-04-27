import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePersonalStatementsComponent } from './profile-personal-statements.component';

describe('ProfilePersonalStatementsComponent', () => {
  let component: ProfilePersonalStatementsComponent;
  let fixture: ComponentFixture<ProfilePersonalStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePersonalStatementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePersonalStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
