import { Book } from "../books/book";

export interface List {
    id: number;
    title: string;
    books: Book[];
}