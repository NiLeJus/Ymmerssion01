import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InboxScreenComponent } from './inbox-screen.component';

describe('InboxScreenComponent', () => {
  let component: InboxScreenComponent;
  let fixture: ComponentFixture<InboxScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InboxScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InboxScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
