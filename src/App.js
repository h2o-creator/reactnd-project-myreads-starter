import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import SearchBooks from './SearchBooks'
import './App.css'
import CreateShelf from './CreateShelf'

class BooksApp extends React.Component {
  state = {
      books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then ((books) => (
      this.setState({books})
    ))
  }

  // Shelf Types By API:
  // read, wantToRead, currentlyReading (as of 13/10/2021 -- Abdelhady Salah)
  getBooksByShelf = shelf => (this.state.books.filter((book) => {
      const filterShelf = book.shelf;
      return filterShelf === shelf;
  }))

  moveBookToShelf = (bookTitle, shelf) => {
    BooksAPI.get(bookTitle)
    .then((book) => {
      BooksAPI.update(book, shelf)
      .then(() => {
        BooksAPI.getAll()
        .then ((books) => {
          this.setState({books})
        })
      })
    })
  }

  getBookShelf = (bookTitle) => (
    BooksAPI.get(bookTitle)
    .then((book) => {
      return book.shelf !== undefined ? book.shelf : 'none';
    })
  )

  fetchBook = (searchTerms) => (
    BooksAPI.search(searchTerms)
    .then ((result) => result)
  )

  render() {
    return (
      <div className="app">
          <Route exact path='/search' render={({ history }) => (
            <SearchBooks onFetchBook={this.fetchBook} onChangeShelf={(bookTitle, bookShelf) => {
              this.moveBookToShelf(bookTitle, bookShelf)
              history.push('/')
            }} getBookShelf={this.getBookShelf} />
          )} />
          <Route exact path='/' render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CreateShelf shelfName="Currently Reading" shelfBooks={this.getBooksByShelf('currentlyReading')} onChangeShelf={this.moveBookToShelf} getBookShelf={this.getBookShelf} />
                <CreateShelf shelfName="Want to Read" shelfBooks={this.getBooksByShelf('wantToRead')} onChangeShelf={this.moveBookToShelf} getBookShelf={this.getBookShelf} />
                <CreateShelf shelfName="Read" shelfBooks={this.getBooksByShelf('read')} onChangeShelf={this.moveBookToShelf} getBookShelf={this.getBookShelf} />
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>
                <button>Add a book</button>
              </Link>
            </div>
          </div>
          )} />
      </div>
    )
  }
}

export default BooksApp
