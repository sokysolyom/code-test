import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VenueDataComponent } from './venue-data.component';

describe('VenueDataComponent', () => {
  let component: VenueDataComponent;
  let fixture: ComponentFixture<VenueDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VenueDataComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(VenueDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
