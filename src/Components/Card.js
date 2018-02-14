import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Card extends Component {
  constructor() {
    super();
    this.state = {
        hidden: false,
    };
}
  useCard(id){
    this.setState({ hidden: true });

    setTimeout(() => {
      this.props.onUse(id);
    }, 500);
  }
  render() {
    return (
      <div className={this.state.hidden ? 'card hidden' : 'card' } onClick={this.useCard.bind(this, this.props.card.id)}>
      <h2 className="card-name">
        {this.props.card.name}
      </h2>
      <ul>
        <li><img src="/public/images/svg/dollar.svg" alt="Cost:" className="icon" /> {this.props.card.cost}</li>
        <li><img src="/public/images/svg/location.svg" alt="Damage:" className="icon" />  {this.props.card.damage}</li>
        <li><img src="/public/images/svg/Loop.svg" alt="Recurring Damage:" className="icon" /> {this.props.card.recurringDamage}</li>
      </ul>
      </div>
    );
  }
}

Card.propTypes = {
  onUse: PropTypes.func,
  card: PropTypes.object
}

export default Card;
