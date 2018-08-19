import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs/index";
import {BooksResponseWrapper} from "../models/books_response_wrapper.model";
import {environment} from "../../../environments/environment";
@Injectable({
  providedIn: "root"
})
export class BooksService
{

  books_url = "https://es.bibles.org/v2/versions/" + environment.bible_version + "/books.js?include_chapters=true";

  constructor(
    private httpClient: HttpClient
  ) { }

  getBooks(): Observable<BooksResponseWrapper>
  {
    return this.httpClient.get<BooksResponseWrapper>(this.books_url);
  }
}
