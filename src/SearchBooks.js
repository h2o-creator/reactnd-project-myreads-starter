import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Book from './Book'

export default class SearchBooks extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            value: '',
            customBooks: []
        }
    }

    async handleChange(event) {
        this.setState({ value: event.target.value });

        const result = await this.props.onFetchBook(event.target.value);
        this.setState({ customBooks: result });

        if (this.state.customBooks === undefined || this.state.customBooks.error === 'empty query') {
            this.setState({ customBooks: [] });
        }
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to='/'>
                        <button className="close-search">Close</button>
                    </Link>
                    <div className="search-books-input-wrapper">
                        {/*
                        NOTES: The search from BooksAPI is limited to a particular set of search terms.
                        You can find these search terms here:
                        https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                        However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                        you don't find a specific author or title. Every search is limited by search terms.
                        */}
                        <input name="value" value={this.state.value} onChange={this.handleChange} type="text" placeholder="Search by title or author"/>
                    </div>
                </div>
                {this.state.value !== '' ? (
                    <div className="search-books-results">
                        <ol className="books-grid">
                            {(this.state.customBooks !== undefined && this.state.customBooks.error !== 'empty query' && this.state.customBooks.length !== 0) ? (this.state.customBooks.map((book) => (
                                <Book key={book.id} id={book.id} image={(book.imageLinks !== undefined) ? book.imageLinks.thumbnail :
                                    'https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg'} title={book.title} getBookShelf={this.props.getBookShelf} authors={book.authors} 
                                    onChangeShelf={this.props.onChangeShelf} isBookInMainArray={this.props.isBookInMainArray} />
                            ))) : (<div className="search-books-results">Nothing found.</div>)}
                        </ol>
                    </div>
                ) : (<div className="search-books-results">Type something above to begin the magic!</div>)}
            </div>
        )
    }
}

SearchBooks.propTypes = {
    onFetchBook: PropTypes.func.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired
}