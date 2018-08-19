import {Book} from "./book.model";
import {Meta} from "./meta.model";
export class BooksResponse
{
  books: Book[];
  meta: Meta;
}
