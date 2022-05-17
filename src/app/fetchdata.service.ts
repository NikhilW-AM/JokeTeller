import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { elementAt } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchdataService {

  constructor(private _http: HttpClient) { }

  baseUrl = `https://v2.jokeapi.dev/joke/Any?`
  getAllData() {
    return this._http.get('https://v2.jokeapi.dev/info')
  }


  createLink(obj: any) {
    this.baseUrl = `https://v2.jokeapi.dev/joke/`
    let catagory = obj.catagory.join(',')
    let language = obj.language
    let blacklist = obj.flags.join(',')
    let format = obj.format
    let jokeType = obj.type
    let contains = obj.contentSearch
    let amount = obj.amount
    let range = obj.range
    //console.log(range);

    if (catagory) {
      language !== 'en' ? this.baseUrl = this.baseUrl + catagory + `?lang=${language
        }` : this.baseUrl += catagory
    }
    else {
      language === 'en' ? this.baseUrl = this.baseUrl + `Any` : this.baseUrl = this.baseUrl + `Any?lang=${language
        }`
    }

    if (blacklist) {
      language !== 'en' ? this.baseUrl = this.baseUrl + `&blacklistFlags=${blacklist}` : this.baseUrl = this.baseUrl + `?blacklistFlags=${blacklist}`
    }


    if (format) {
      language !== 'en' || blacklist ? this.baseUrl = this.baseUrl + `&format=${format}` : this.baseUrl = this.baseUrl + `?format=${format}`
    }


    if (jokeType.length == 1) {
      language !== 'en' || blacklist || format ? this.baseUrl = this.baseUrl + `&type=${jokeType}` : this.baseUrl = this.baseUrl + `?type=${jokeType}`

    }

    if (contains) {
      language !== 'en' || blacklist || format || jokeType.length === 1 ? this.baseUrl = this.baseUrl + `&contains=${contains}` : this.baseUrl = this.baseUrl + `?contains=${contains}`
    }

    if (range) {
      language !== 'en' || blacklist || format || jokeType.length === 1 || contains ? this.baseUrl = this.baseUrl + `&idRange=${range}` : this.baseUrl = this.baseUrl + `?idRange=${range}`
    }

    if (amount > 1) {
      language !== 'en' || blacklist || format || jokeType.length === 1 || range || contains ? this.baseUrl = this.baseUrl + `&amount=${amount}` : this.baseUrl = this.baseUrl + `?amount=${amount}`
    }

    //console.log(this.baseUrl);
    return this._http.get(this.baseUrl)
  }

}

