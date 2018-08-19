import { Component, OnInit } from "@angular/core";
import {BooksService} from "../../services/books.service";
import {Book} from "../../models/book.model";
import {FormControl} from "@angular/forms";
import {map, startWith} from "rxjs/operators";
import {Observable} from "rxjs/index";
import {PassageService} from "../../services/passage.service";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {

  constructor(
    private books_service: BooksService,
    private passage_service: PassageService,
    private sanitizer: DomSanitizer
  ) { }

  books: Book[];
  chapters = [];
  verses = [];
  passage: SafeHtml;
  selectedBook: Book;
  selectedChapter: number;
  selectedVerse: number;

  filteredBooks: Observable<Book[]>;

  textControl = new FormControl();
  bookControl = new FormControl();
  chapterControl = new FormControl();
  versesControl = new FormControl();

  ngOnInit() {
    this.books_service.getBooks().subscribe(
      books_response_wrapper =>
      {
        this.books = books_response_wrapper.response.books;
        console.table(this.books);
        // Trigger an action to update filter
        this.textControl.setValue("");
      }
    );

    this.filteredBooks = this.textControl.valueChanges
      .pipe(
        startWith(""),
        map(value => this._filter(value))
      );

    this.bookControl.valueChanges.subscribe(
      book =>
      {
        this.selectedBook = book;
        this.loadChapters();
      }
    );
    this.chapterControl.valueChanges.subscribe(
      chapter =>
      {
        this.selectedChapter = + chapter;
        this.loadVerses();
      }
    );
    this.versesControl.valueChanges.subscribe(
      verse =>
      {
        this.selectedVerse = + verse;
        this.loadVerseFromAPI();
      }
    );
  }

  private _filter(value: string): Book[] {
    const filterValue = value.toLowerCase();
    console.log("Value: ", value);
    if (this.books)
    {
      if (value)
      {
        return this.books.filter(option => option.name.toLowerCase().includes(filterValue));
      }
      else
      {
        return this.books;
      }
    }
    else
    {
      return [];
    }
  }

  loadChapters()
  {
    console.log(this.selectedBook);
    if (this.selectedBook && this.selectedBook.osis_end)
    {
      const number_of_chapters = + this.selectedBook.osis_end.split(".")[1];
      this.chapters = Array.from(new Array(number_of_chapters), (val, index) => index + 1);
    }
  }

  loadVerses()
  {
    if (this.selectedBook && this.selectedBook.chapters && this.selectedBook.chapters[this.selectedChapter - 1])
    {
      const number_of_verses = + this.selectedBook.chapters[this.selectedChapter - 1].osis_end.split(".")[2];
      console.log(number_of_verses);
      this.verses = Array.from(new Array(number_of_verses), (val, index) => index + 1);
    }
  }

  loadVerseFromAPI()
  {
    this.passage_service.getPassage(
      this.selectedBook.abbr,
      this.selectedChapter,
      this.selectedVerse
    ).subscribe(
      passage_wrapper =>
      {
        console.log(passage_wrapper);
        console.log(passage_wrapper.response.search.result.passages[0].text);
        this.passage = this.sanitizer.bypassSecurityTrustHtml(passage_wrapper.response.search.result.passages[0].text);
      }
    );
  }
}
