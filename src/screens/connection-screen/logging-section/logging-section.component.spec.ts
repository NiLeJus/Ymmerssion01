import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggingSectionComponent } from './logging-section.component';

describe('LoggingSectionComponent', () => {
  let component: LoggingSectionComponent;
  let fixture: ComponentFixture<LoggingSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggingSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggingSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
