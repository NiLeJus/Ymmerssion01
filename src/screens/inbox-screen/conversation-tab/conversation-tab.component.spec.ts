import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationTabComponent } from './conversation-tab.component';

describe('ConversationTabComponent', () => {
  let component: ConversationTabComponent;
  let fixture: ComponentFixture<ConversationTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConversationTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConversationTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
