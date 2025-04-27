import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileWorkplaceStatementsComponent } from './profile-workplace-statements.component';

describe('ProfileWorkplaceStatementsComponent', () => {
  let component: ProfileWorkplaceStatementsComponent;
  let fixture: ComponentFixture<ProfileWorkplaceStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWorkplaceStatementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileWorkplaceStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
