import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutNoMobileComponent } from './layout-no-mobile.component';

describe('LayoutNoMobileComponent', () => {
  let component: LayoutNoMobileComponent;
  let fixture: ComponentFixture<LayoutNoMobileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutNoMobileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutNoMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
