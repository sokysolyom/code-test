import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventUpdateChangeAdminComponent } from './event-update-change-admin.component';

describe('EventUpdateChangeAdminComponent', () => {
  let component: EventUpdateChangeAdminComponent;
  let fixture: ComponentFixture<EventUpdateChangeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventUpdateChangeAdminComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventUpdateChangeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
