import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileRepresentativeStatementsComponent } from './profile-representative-statements.component';

describe('ProfileRepresentativeStatementsComponent', () => {
  let component: ProfileRepresentativeStatementsComponent;
  let fixture: ComponentFixture<ProfileRepresentativeStatementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileRepresentativeStatementsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileRepresentativeStatementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
