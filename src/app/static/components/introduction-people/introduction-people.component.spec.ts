import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IntroductionPeopleComponent } from './introduction-people.component';

describe('IntroductionPeopleComponent', () => {
  let component: IntroductionPeopleComponent;
  let fixture: ComponentFixture<IntroductionPeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroductionPeopleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IntroductionPeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
