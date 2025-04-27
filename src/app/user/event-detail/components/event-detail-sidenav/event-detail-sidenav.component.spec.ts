import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailSidenavComponent } from './event-detail-sidenav.component';

describe('EventDetailSidenavComponent', () => {
  let component: EventDetailSidenavComponent;
  let fixture: ComponentFixture<EventDetailSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
