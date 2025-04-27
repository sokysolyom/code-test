import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContantFormComponent } from './contant-form.component';

describe('ContantFormComponent', () => {
  let component: ContantFormComponent;
  let fixture: ComponentFixture<ContantFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContantFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContantFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
