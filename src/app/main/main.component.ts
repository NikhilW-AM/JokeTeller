import { Component, OnInit } from '@angular/core';
import { FetchdataService } from '../fetchdata.service';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  catagory: boolean = true;
  catagoryArray: any[] = [];
  jokeData: any
  langugeArray: any
  language?: any
  lang?: any
  selectedLanguage: string = 'en'
  flagArray: any
  formatArray: any
  typeArray: any
  rangeArray: any
  rangeID: any
  idArray: any
  start: number = 0
  end: number = 0
  sRange: number = 0;
  eRange: number = 0

  jokeTellerForm!: FormGroup
  constructor(private _fetchService: FetchdataService, private _fb: FormBuilder) { }

  ngOnInit(): void {

    this.getData()
    this.jokeTellerForm = this._fb.group({
      catagory: this._fb.array([]),
      language: ['en'],
      flags: this._fb.array([]),
      format: [''],
      type: this._fb.array([]),
      contentSearch: [''],
      range: [''],
      amount: ['1']
    })
  }

  getData() {
    this._fetchService.getAllData().subscribe((data: any) => {
      this.jokeData = data
      //console.log(this.jokeData);
      this.langugeArray = this.jokeData.jokes.safeJokes
      this.flagArray = this.jokeData.jokes.flags
      this.rangeArray = this.jokeData.jokes.idRange
      this.sRange = 0
      this.eRange = this.jokeData.jokes.totalCount
      //console.log(this.rangeArray);
      this.catagoryArray = this.jokeData.jokes.categories.map((cat: any) => {
        return {
          catagory: cat,
          value: false
        }
      })
      this.formatArray = data.formats.filter((format: any, i: number) => {
        if (i > 0)
          return format
      })

      this.flagArray = this.jokeData.jokes.flags.map((flag: any) => {
        return {
          f: flag,
          value: false
        }
      })
      this.typeArray = data.jokes.types.map((type: any) => {
        return {
          t: type,
          value: true
        }
      })
      this.rangeID = Object.keys(this.rangeArray).map((key: any) => {
        return {
          lan: key,
          range: this.rangeArray[key]
        }
      });
      this.setType()
      this.setRangeID()
      //console.log(this.typeArray);
    })
  }

  changeCatagory(val: any) {
    // console.log(val.target.value)
    if (val.target.value === 'any') {
      this.catagory = true;
    } else {
      this.catagory = false;
    }
  }

  selectCatagory(cat: any, index: number) {
    var formdata = this.jokeTellerForm.get('catagory') as FormArray;
    if (this.catagoryArray[index].value) {
      this.catagoryArray[index].value = false
      var i = formdata.controls.findIndex(x => x.value === cat.catagory);
      formdata.removeAt(i);
    }
    else {
      this.catagoryArray[index].value = true
      formdata.push(new FormControl(cat.catagory));
    }
    //console.log(this.jokeTellerForm.value);
  }

  selectLanguage(lang: any) {
    //console.log(lang.target.value);
    this.language = lang.target.value
    this.jokeTellerForm.controls['language'].setValue(lang.target.value);
    this.jokeTellerForm.controls['range'].setValue('');

    this.setRangeID()
  }

  selectFlags(flag: any, index: number) {
    var formdata = this.jokeTellerForm.get('flags') as FormArray;
    if (this.flagArray[index].value) {
      this.flagArray[index].value = false
      var i = formdata.controls.findIndex(x => x.value === flag.f);
      formdata.removeAt(i);
    }
    else {
      this.flagArray[index].value = true
      formdata.push(new FormControl(flag.f));
    }
    // console.log(this.jokeTellerForm.value);
  }

  selectFormat(e: any) {
    // console.log(e);
    this.jokeTellerForm.controls['format'].setValue(e);
  }

  setType() {
    var formdata = this.jokeTellerForm.get('type') as FormArray;
    for (let i = 0; i < this.typeArray.length; i++) {
      formdata.push(new FormControl(this.typeArray[i].t));
    }
  }

  selectType(type: any, index: number) {
    // console.log(type);
    var formdata = this.jokeTellerForm.get('type') as FormArray;
    if (this.typeArray[index].value) {
      this.typeArray[index].value = false
      var i = formdata.controls.findIndex(x => x.value === type.t);
      formdata.removeAt(i);
    }
    else {
      this.typeArray[index].value = true
      formdata.push(new FormControl(type.t));
    }
  }

  setRangeID() {
    if (this.language) {
      for (let i = 0; i < this.rangeID.length; i++) {
        if (this.rangeID[i].lan === this.language) {
          this.start = this.rangeID[i].range[0];
          this.end = this.rangeID[i].range[1];
          this.sRange = this.start
          this.eRange = this.end
        }
      }
    }
  }


  increaseRange(num: any) {
    //console.log(num.target.value);
    this.sRange = parseInt(num.target.value)

    if (this.sRange !== this.start || this.eRange !== this.end) {
      this.jokeTellerForm.controls['range'].setValue(this.sRange.toString() + '-' + this.eRange.toString());
    }
    else {
      this.jokeTellerForm.controls['range'].setValue('');
    }
  }
  decreaseRange(num: any) {
    //console.log(num.target.value);
    this.eRange = parseInt(num.target.value)
    if (this.sRange !== this.start || this.eRange !== this.end) {
      this.jokeTellerForm.controls['range'].setValue(this.sRange.toString() + '-' + this.eRange.toString());
    }
    else {
      this.jokeTellerForm.controls['range'].setValue('');
    }
  }
  onSubmit() {
    console.log(this.jokeTellerForm.value);

    this._fetchService.createLink(this.jokeTellerForm.value).subscribe((res: any) => {
      console.log(res);

    })
    // this._fetchService.getJokes().subscribe((res: any) => {
    //   console.log(res);

    // })
  }
  resetForm() {
    this.jokeTellerForm.reset()
    this.getData()
  }
}
