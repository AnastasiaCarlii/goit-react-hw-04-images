import React, { Component } from 'react';

import { MdImageSearch } from 'react-icons/md';

import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    query: '',
  };

  handleChange = e => {
    this.setState({
      query: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    const { query } = this.state;
    if (query.trim() === '') {
      return alert('can not be empty');
    }
    this.props.onSubmit(query);
  };

  render() {
    const { query } = this.state;

    return (
      <header className={css.searchbar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.searchButton}>
            <span className={css.buttonLabel}>
              <MdImageSearch size={25}></MdImageSearch>
            </span>
          </button>

          <input
            className={css.formInput}
            value={query}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}
