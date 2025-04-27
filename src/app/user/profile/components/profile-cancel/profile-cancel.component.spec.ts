import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileCancelComponent } from './profile-cancel.component';

describe('ProfileCancelComponent', () => {
  let component: ProfileCancelComponent;
  let fixture: ComponentFixture<ProfileCancelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCancelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
