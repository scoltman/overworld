import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Card from './Card'
class Hand extends Component {
  useCard(id){
    this.props.onUse(id);
  }
  render() {
    let cards;
    if(this.props.cards){
      cards = this.props.cards.map(card => {
        return (
          <Card onUse={this.useCard.bind(this)} key={card.id} card={card} isUsable={true} />
        )
      })
    }
    return (
      <div className="Hand">
        {cards}
      </div>
    );
  }
}

Hand.propTypes = {
  onUse: PropTypes.func,
  cards: PropTypes.array
}

export default Hand;
