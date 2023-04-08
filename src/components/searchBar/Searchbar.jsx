import PropTypes from 'prop-types';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import '../../styles/styles.css';

class Searchbar extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
  };

  state = {
    searchQuery: '',
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ searchQuery: value });
  };

  handleSubmit = evt => {
    const { searchQuery } = this.state;
    evt.preventDefault();
    if (searchQuery.trim() === '') {
      return;
    }
    this.props.onFormSubmit(searchQuery.trim());
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <BsSearch />
          </button>

          <input
            className="SearchForm-input"
            type="text"
            onChange={this.handleChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchQuery}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;
