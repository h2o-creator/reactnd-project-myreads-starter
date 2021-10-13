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

  moveBookToShelf = (bookID, shelf) => {
    this.setState((prevState) => {
      let books = prevState.books;
      books.forEach((eachBook) => {
        if (eachBook.id === bookID) {
          eachBook.shelf = shelf;
          BooksAPI.update(eachBook, shelf)
        }
      })
      return { books }
    })
  }

  fetchBook = (searchTerms) => (
    BooksAPI.search(searchTerms)
    .then ((result) => result)
  )

  render() {
    return (
      <div className="app">
          <Route exact path='/search' render={() => (
            <SearchBooks onFetchBook={this.fetchBook} />
          )} />
          <Route exact path='/' render={() => (
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <CreateShelf shelfName="Currently Reading" shelfBooks={this.getBooksByShelf('currentlyReading')} onChangeShelf={this.moveBookToShelf} />
                <CreateShelf shelfName="Want to Read" shelfBooks={this.getBooksByShelf('wantToRead')} onChangeShelf={this.moveBookToShelf} />
                <CreateShelf shelfName="Read" shelfBooks={this.getBooksByShelf('read')} onChangeShelf={this.moveBookToShelf} />
                <CreateShelf shelfName="Uncategorized" shelfBooks={this.getBooksByShelf('none')} onChangeShelf={this.moveBookToShelf} />
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
