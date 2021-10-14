import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

export default class CreateShelf extends Component { 
    render() {
        const { shelfName, shelfBooks, onChangeShelf } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfBooks.map((book) => (
                        <Book key={book.id} id={book.id} 
                        image={book.imageLinks !== undefined ? book.imageLinks.thumbnail : 'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'} 
                        title={book.title} shelf={book.shelf} authors={book.authors} onChangeShelf={onChangeShelf} getBookShelf={this.props.getBookShelf} />
                    ))}
                </ol>
                </div>
            </div>
        )
    }
}

CreateShelf.propTypes = {
    shelfName: PropTypes.string.isRequired,
    shelfBooks: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired
}