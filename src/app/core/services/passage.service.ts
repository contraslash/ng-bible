import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs/index";

@Injectable({
  providedIn: "root"
})
export class PassageService {

  books_url = "https://es.bibles.org/v2/" + environment.bible_version + "/passages.js";

  constructor(
    private httpClient: HttpClient
  ) { }

  getPassage(
    book: String,
    chapter: number,
    verse: number
  ): Observable<any>
  {
    const query_params = "?q=" + book + "+" + chapter + ":" + verse;
    console.log(query_params);
    return this.httpClient.get(this.books_url + query_params);
  }
}
