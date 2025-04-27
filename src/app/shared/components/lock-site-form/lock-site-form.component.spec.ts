import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LockSiteFormComponent } from './lock-site-form.component';

describe('LockSiteFormComponent', () => {
  let component: LockSiteFormComponent;
  let fixture: ComponentFixture<LockSiteFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LockSiteFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LockSiteFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
