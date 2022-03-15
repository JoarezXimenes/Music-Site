import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import musicsAPI from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import Carregando from '../components/Carregando';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      albumName: '',
      albumPic: '',
      artistName: '',
      musicList: [],
      loading: false,
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.getAlbumInfo1(id);
  }

  changeLoad = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  atualizarFav =async (musics) => {
    const musicListAdd = musics.map((el) => {
      el.isFav = false;
      return el;
    });
    const favList = await getFavoriteSongs();
    const modList = musicListAdd.map((e1) => {
      favList.forEach((e2) => {
        if (e1.trackId === e2.trackId) {
          e1.isFav = true;
        }
      });
      return e1;
    });
    this.setState({
      musicList: modList,
      loading: false,
    });
  }

  getAlbumInfo1 = async (id) => {
    const albumInfoArray = await musicsAPI(id);
    this.getAlbumInfo(albumInfoArray);
  }

  getAlbumInfo = (array) => {
    const albumArray = array;
    const item1 = albumArray[0];
    const fotoAlbum = item1.artworkUrl100;
    const nomeAlbum = item1.collectionName;
    const nomeArtista = item1.artistName;
    this.setState({
      albumName: nomeAlbum,
      albumPic: fotoAlbum,
      artistName: nomeArtista,
    }, () => {
      const musics = albumArray.filter((_elem, index) => index > 0);
      this.atualizarFav(musics);
    });
  }

  addMusic =async (obj) => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    await addSong(obj);
    this.getAlbumInfo1(id);
  }

  remMusic =async (obj) => {
    const { match: { params: { id } } } = this.props;
    this.setState({ loading: true });
    await removeSong(obj);
    await this.getAlbumInfo1(id);
  }

  render() {
    const { albumName, albumPic, artistName, musicList, loading } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <div>
            <img src={ albumPic } alt={ albumName } />
            <h3 data-testid="album-name">{ albumName }</h3>
            <p data-testid="artist-name">{ artistName }</p>
          </div>
          {
            loading ? <Carregando /> : (
              <div>
                {
                  musicList.map((music) => (
                    <MusicCard
                      key={ music.trackId }
                      trackName={ music.trackName }
                      previewUrl={ music.previewUrl }
                      trackId={ music.trackId }
                      trackImg={ music.artworkUrl60 }
                      check={ music.isFav }
                      handleCheck={ this.handleCheck }
                      addMusic={ this.addMusic }
                      remMusic={ this.remMusic }
                    />
                  ))
                }
              </div>
            )
          }
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
