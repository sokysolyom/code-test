import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileWorkplaceFormComponent } from './profile-workplace-form.component';

describe('ProfileWorkplaceFormComponent', () => {
  let component: ProfileWorkplaceFormComponent;
  let fixture: ComponentFixture<ProfileWorkplaceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileWorkplaceFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileWorkplaceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
