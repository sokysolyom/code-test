import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfilePersonalFormComponent } from './profile-personal-form.component';

describe('ProfilePersonalFormComponent', () => {
  let component: ProfilePersonalFormComponent;
  let fixture: ComponentFixture<ProfilePersonalFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePersonalFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePersonalFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
