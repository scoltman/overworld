import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Enemy extends Component {
  render() {
    return (
      <div className="enemy-details">
        <img className="enemy-image" src="/public/images/enemy.png" alt="{this.props.enemy.name}" />
        <h2 className="enemy-name">
          {this.props.enemy.name}
        </h2>
        <ul className="enemy-stats">
          <li className="enemy-health">
            <img src="/public/images/svg/Heart.svg" alt="Health:" className="icon" /> {this.props.enemy.health}
          </li>
          <li className="enemy-energy">
            <img src="/public/images/svg/Sun.svg" alt="Energy:" className="icon" /> {this.props.enemy.energy}
          </li>
          <li className="enemy-recurring">
          <img src="/public/images/svg/Loop.svg" alt="Recurring Damage:" className="icon" /> {this.props.enemy.recurringDamage}
          </li>
        </ul>
      </div>
    );
  }
}

Enemy.propTypes = {
  enemy: PropTypes.object
}


export default Enemy;
