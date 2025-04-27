import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileMarketingStatementsComponent } from './profile-marketing-statements.component';

describe('ProfileMarketingStatementsComponent', () => {
  let component: ProfileMarketingStatementsComponent;
  let fixture: ComponentFixture<ProfileMarketingStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMarketingStatementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileMarketingStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
