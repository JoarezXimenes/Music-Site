import React from 'react';
import PropTypes from 'prop-types';
import { getFavoriteSongs, addSong, removeSong } from '../services/favoriteSongsAPI';
import './componentsCSS/MusicCard.css';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFav: false,
    };
  }

  componentDidMount() {
    this.getFavSongs();
  }

  handleCheck =async () => {
    const { isFav } = this.state;
    const { trackName, previewUrl, trackId, trackImg, changeLoading } = this.props;
    const musicObj = {
      trackId,
      trackImg,
      trackName,
      previewUrl,
    };
    if (isFav === false) {
      this.setState({ isFav: true });
      changeLoading();
      await addSong(musicObj);
      changeLoading();
      this.getFavSongs();
    } else if (isFav === true) {
      this.setState({ isFav: false });
      changeLoading();
      await removeSong(musicObj);
      changeLoading();
      this.getFavSongs();
    }
  }

  getFavSongs =async () => {
    const { trackId } = this.props;
    const songArray = await getFavoriteSongs();
    const favVerify = songArray.some((e) => e.trackId === trackId);
    this.setState({ isFav: favVerify });
  }

  render() {
    const { trackName, previewUrl, trackId, trackImg } = this.props;
    const { isFav } = this.state;
    return (
      <div className="musicCard">
        <img src={ trackImg } alt={ trackName } />
        <p>{ trackName }</p>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
        </audio>
        <label htmlFor="favorited">
          Favorita
          <input
            type="checkbox"
            data-testid={ `checkbox-music-${trackId}` }
            value={ trackId }
            checked={ isFav }
            onChange={ this.handleCheck }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  trackImg: PropTypes.string.isRequired,
  changeLoading: PropTypes.func.isRequired,
};

export default MusicCard;
