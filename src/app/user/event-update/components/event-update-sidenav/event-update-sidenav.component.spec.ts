import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateSidenavComponent } from './event-update-sidenav.component';

describe('EventUpdateSidenavComponent', () => {
  let component: EventUpdateSidenavComponent;
  let fixture: ComponentFixture<EventUpdateSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateSidenavComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventUpdateSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
