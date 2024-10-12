import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRoomSectionComponent } from './create-room-section.component';

describe('CreateRoomSectionComponent', () => {
  let component: CreateRoomSectionComponent;
  let fixture: ComponentFixture<CreateRoomSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRoomSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateRoomSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
