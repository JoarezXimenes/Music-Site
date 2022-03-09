import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      btnDisable: true,
    };
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ search: value });
    if (value.length >= 2) {
      this.setState({ btnDisable: false });
    } else if (value.length < 2) {
      this.setState({ btnDisable: true });
    }
  }

  handleClick = (event) => {
    event.preventDefault();
  }

  render() {
    const { search, btnDisable } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            placeholder="Nome do Artista"
            data-testid="search-artist-input"
            type="text"
            value={ search }
            onChange={ this.handleChange }
          />
          <button
            disabled={ btnDisable }
            data-testid="search-artist-button"
            type="submit"
            onClick={ this.handleClick }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
