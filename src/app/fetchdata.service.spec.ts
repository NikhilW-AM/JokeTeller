import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FetchdataService } from './fetchdata.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';

describe('FetchdataService', () => {
  let service: FetchdataService;
  let fetchdata = { getAllData: () => { } }
  let httpMock: HttpTestingController
  let http: HttpClient

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FetchdataService, {
        provide: FetchdataService, useValue: fetchdata
      }],
    });
    service = TestBed.inject(FetchdataService)
    http = TestBed.inject(HttpClient)
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {

    expect(service).toBeTruthy();
  });

});
