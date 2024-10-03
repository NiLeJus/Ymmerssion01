import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggingScreenComponent } from './logging-screen.component';

describe('LoggingScreenComponent', () => {
  let component: LoggingScreenComponent;
  let fixture: ComponentFixture<LoggingScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoggingScreenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoggingScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
