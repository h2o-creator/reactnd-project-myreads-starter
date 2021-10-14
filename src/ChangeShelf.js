import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ChangeShelf extends Component {
    state = {
        shelf: 'none'
    }

    async componentDidMount() {
        const shelf = await this.props.getBookShelf(this.props.book);
        if (this.state.shelf !== shelf) {
            return this.setState({ shelf });
        }
    }

    tryChangeShelf = (event) => {
        const { book, onChangeShelf } = this.props;
        onChangeShelf(book, event.target.value);
    }

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.shelf} onChange={this.tryChangeShelf} >
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

ChangeShelf.propTypes = {
    book: PropTypes.string.isRequired,
    onChangeShelf: PropTypes.func.isRequired,
    getBookShelf: PropTypes.func.isRequired
}