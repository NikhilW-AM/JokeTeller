import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http'
import { MainComponent } from './main.component';
import { FetchdataService } from '../fetchdata.service';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  let fetchService: FetchdataService
  let fetchServiceSpy: jasmine.SpyObj<FetchdataService>
  let fake: {
    "error": false,
    "version": "2.3.2",
    "jokes": {
      "totalCount": 1369,
      "categories": [
        "Any",
        "Misc",
        "Programming",
        "Dark",
        "Pun",
        "Spooky",
        "Christmas"
      ],
      "flags": [
        "nsfw",
        "religious",
        "political",
        "racist",
        "sexist",
        "explicit"
      ],
      "types": [
        "single",
        "twopart"
      ],
      "submissionURL": "https://v2.jokeapi.dev#submit",
      "idRange": {
        "cs": [
          0,
          3
        ],
        "de": [
          0,
          35
        ],
        "es": [
          0,
          6
        ],
        "en": [
          0,
          319
        ],
        "pt": [
          0,
          1
        ],
        "fr": [
          0,
          999
        ]
      },
      "safeJokes": [
        {
          "lang": "cs",
          "count": 2
        },
        {
          "lang": "de",
          "count": 30
        },
        {
          "lang": "es",
          "count": 6
        },
        {
          "lang": "en",
          "count": 182
        },
        {
          "lang": "pt",
          "count": 1
        },
        {
          "lang": "fr",
          "count": 999
        }
      ]
    },
    "formats": [
      "json",
      "xml",
      "yaml",
      "txt"
    ],
    "jokeLanguages": 6,
    "systemLanguages": 5,
    "info": "If you want to stay up to date on the status and future updates of JokeAPI or need some help, consider joining my Discord server: https://dc.sv443.net/",
    "timestamp": 1648621815836
  }
  beforeEach(async () => {
    fetchServiceSpy = jasmine.createSpyObj(FetchdataService, { 'getAllData': of(fake) })
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [MainComponent],
      providers: [FormBuilder, {
        provide: FetchdataService, useValue: fetchServiceSpy
      }]
    })
      .compileComponents();


    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fetchService = TestBed.inject(FetchdataService)
    fixture.detectChanges();
  });

  it('select Any or Catagory', () => {
    expect(component.changeCatagory('true')).toBeTruthy();
    expect(component['flagArray']).toEqual(['nsfw', 'religious', 'political', 'racist', 'sexist', 'explicit']);
  });

});
