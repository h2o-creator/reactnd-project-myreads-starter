import React from 'react'
import PropTypes from 'prop-types'
import ChangeShelf from './ChangeShelf'

const Book = (props) => {
    const { id, image, title, onChangeShelf, getBookShelf, authors } = props;
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
                    {(onChangeShelf) && (
                        <ChangeShelf book={id} onChangeShelf={onChangeShelf} getBookShelf={getBookShelf} />
                    )}
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{authors !== undefined ? authors.map((author) => (<div key={author}>{author}</div>)) : 'NA'}</div>
            </div>
        </li>
    )
}

Book.propTypes = {
    id: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
    onChangeShelf: PropTypes.func.isRequired,
    isBookInMainArray: PropTypes.func,
    getBookShelf: PropTypes.func.isRequired
}

export default Book