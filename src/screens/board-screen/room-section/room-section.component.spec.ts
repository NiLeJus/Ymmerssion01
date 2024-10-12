import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RoomSectionComponent } from './room-section.component';

describe('RoomSectionComponent', () => {
  let component: RoomSectionComponent;
  let fixture: ComponentFixture<RoomSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
