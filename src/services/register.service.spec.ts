/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { Register } from './register.service';

describe('Service: Register', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Register]
    });
  });

  it('should ...', inject([Register], (service: Register) => {
    expect(service).toBeTruthy();
  }));
});
