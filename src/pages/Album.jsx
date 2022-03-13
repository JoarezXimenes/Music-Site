import React from 'react';
import PropTypes from 'prop-types';
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
    this.getAlbumInfo(id);
  }

  changeLoad = () => {
    const { loading } = this.state;
    this.setState({ loading: !loading });
  }

  getAlbumInfo = async (id) => {
    const albumInfoArray = await musicsAPI(id);
    const item1 = albumInfoArray[0];
    const fotoAlbum = item1.artworkUrl100;
    const nomeAlbum = item1.collectionName;
    const nomeArtista = item1.artistName;
    this.setState({
      albumName: nomeAlbum,
      albumPic: fotoAlbum,
      artistName: nomeArtista,
    }, () => {
      const musics = albumInfoArray.filter((_elem, index) => index > 0);
      this.setState({ musicList: musics });
    });
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
                      changeLoading={ this.changeLoad }
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
