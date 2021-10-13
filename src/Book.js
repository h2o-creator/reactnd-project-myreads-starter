import React from 'react'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf'

const Book = (props) => {
    const { id, image, title, shelf, onChangeShelf, authors } = props;
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
                    <ChangeShelf book={id} shelf={shelf} onChangeShelf={onChangeShelf} />
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors.map((author) => (<div key={author}>{author}</div>))}</div>
            </div>
        </li>
    )
}

Book.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    shelf: PropTypes.string.isRequired,
    authors: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default Book