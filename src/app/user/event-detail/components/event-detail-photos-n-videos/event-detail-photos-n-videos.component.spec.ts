import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventDetailPhotosNVideosComponent } from './event-detail-photos-n-videos.component';

describe('EventDetailPhotosNVideosComponent', () => {
  let component: EventDetailPhotosNVideosComponent;
  let fixture: ComponentFixture<EventDetailPhotosNVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetailPhotosNVideosComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetailPhotosNVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
