import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ChangeShelf extends Component {
    static propTypes = {
        book: PropTypes.string.isRequired,
        shelf: PropTypes.string.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    tryChangeShelf = (event) => {
        const { book, onChangeShelf } = this.props;
        onChangeShelf(book, event.target.value);
    }

    render() {
        const { shelf } = this.props;
        return (
            <div className="book-shelf-changer">
                <select value={shelf} onChange={this.tryChangeShelf} >
                    <optgroup label="Move to...">
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </optgroup>
                </select>
            </div>
        )
    }
}