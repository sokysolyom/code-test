import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailOverviewComponent } from './event-detail-overview.component';

describe('EventDetailOverviewComponent', () => {
  let component: EventDetailOverviewComponent;
  let fixture: ComponentFixture<EventDetailOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
