import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateOverviewComponent } from './event-update-overview.component';

describe('EventUpdateOverviewComponent', () => {
  let component: EventUpdateOverviewComponent;
  let fixture: ComponentFixture<EventUpdateOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventUpdateOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
