import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Player extends Component {
  render() {
    return (
      <div className="player-details">
        <img className="player-image" src="/public/images/player.png" />
        <ul className="player-stats">
          <li className="health">
            <img src="/public/images/svg/Heart.svg" alt="Health:" className="icon" /> {this.props.player.health}
          </li>
          <li className="energy">
            <img src="/public/images/svg/Sun.svg" alt="Energy:" className="icon" /> {this.props.player.energy}
          </li>
          <li className="recurring">
            <img src="/public/images/svg/Loop.svg" alt="Recurring Damage:" className="icon" /> {this.props.player.recurringDamage}
          </li>
        </ul>
      </div>
    );
  }
}

Player.propTypes = {
  player: PropTypes.object
}

export default Player;
