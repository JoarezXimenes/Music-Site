import React from 'react';
import PropTypes from 'prop-types';
import './componentsCSS/MusicCard.css';

class MusicCard extends React.Component {
  handleCheck = ({ target }) => {
    const { checked } = target;
    const { trackName, previewUrl, trackId, trackImg, addMusic, remMusic } = this.props;
    const musicObj = {
      trackId,
      trackImg,
      trackName,
      previewUrl,
    };
    if (checked === false) {
      remMusic(musicObj);
    } else if (checked === true) {
      addMusic(musicObj);
    }
  }

  render() {
    const { trackName, previewUrl, trackId, trackImg, check } = this.props;
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
            name={ trackName }
            value={ trackId }
            checked={ check }
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
  addMusic: PropTypes.func.isRequired,
  remMusic: PropTypes.func.isRequired,
  check: PropTypes.bool.isRequired,
};

export default MusicCard;
