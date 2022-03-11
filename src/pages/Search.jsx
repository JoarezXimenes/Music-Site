import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Carregando from '../components/Carregando';
import '../components/componentsCSS/Search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      savedSearch: '',
      btnDisable: true,
      load: false,
      emptyAlbum: false,
      foundAlbum: false,
      albumArray: [],
      rendAlbum: false,
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

  renderAlbum = () => {
    const { albumArray } = this.state;
    if (albumArray.length === 0) {
      this.setState({
        search: '',
        emptyAlbum: true,
        load: false,
        foundAlbum: false,
        rendAlbum: false,
      });
    } else if (albumArray.length > 0) {
      this.setState({
        search: '',
        emptyAlbum: false,
        load: false,
        foundAlbum: true,
        rendAlbum: true,
      });
    }
  }

  handleClick = (event) => {
    event.preventDefault();
    const { search } = this.state;
    this.setState({ savedSearch: search });
    this.setState({ load: true }, async () => {
      const albuns = await searchAlbumsAPI(search);
      await this.setState({
        albumArray: albuns,
      });
    });
    const time = 1000;
    setTimeout(this.renderAlbum, time);
  }

  render() {
    const {
      search,
      btnDisable,
      load,
      emptyAlbum,
      albumArray,
      savedSearch,
      rendAlbum,
      foundAlbum } = this.state;
    return (
      <div className="Search" data-testid="page-search">
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
        <div className="result">
          {load && <Carregando />}
          {foundAlbum && <h1>{`Resultado de álbuns de: ${savedSearch}`}</h1>}
          {emptyAlbum && <h1>Nenhum álbum foi encontrado</h1>}
          {rendAlbum && (
            <div className="albunsList">
              {
                albumArray.map((e) => (
                  <Link
                    to={ `/album/${e.collectionId}` }
                    data-testid={ `link-to-album-${e.collectionId}` }
                    key={ e.collectionId }
                  >
                    <div className="albumCard">
                      <img src={ e.artworkUrl100 } alt={ e.collectionName } />
                      <h3>{ e.collectionName }</h3>
                      <p>{ e.artistName }</p>
                    </div>
                  </Link>
                ))
              }
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Search;
