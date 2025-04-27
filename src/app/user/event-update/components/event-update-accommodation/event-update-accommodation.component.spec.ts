import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateAccommodationComponent } from './event-update-accommodation.component';

describe('EventUpdateAccommodationComponent', () => {
  let component: EventUpdateAccommodationComponent;
  let fixture: ComponentFixture<EventUpdateAccommodationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateAccommodationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventUpdateAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
