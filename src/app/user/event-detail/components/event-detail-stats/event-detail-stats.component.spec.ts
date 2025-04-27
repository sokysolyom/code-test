import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailStatsComponent } from './event-detail-stats.component';

describe('EventDetailStatsComponent', () => {
  let component: EventDetailStatsComponent;
  let fixture: ComponentFixture<EventDetailStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailStatsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
