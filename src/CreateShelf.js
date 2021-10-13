import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf';

export default class CreateShelf extends Component {
    static propTypes = {
        shelfName: PropTypes.string.isRequired,
        shelfBooks: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }
    render() {
        const { shelfName, shelfBooks, onChangeShelf } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelfName}</h2>
                <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfBooks.map((book) => (
                        <li key={book.id}>
                            <div className="book">
                                <div className="book-top">
                                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                    <ChangeShelf book={book} shelf={book.shelf} onChangeShelf={onChangeShelf} />
                                </div>
                                <div className="book-title">{book.title}</div>
                                <div className="book-authors">{book.authors.map((author) => (<div key={author}>{author}</div>))}</div>
                            </div>
                        </li>
                    ))}
                </ol>
                </div>
            </div>
        )
    }
}