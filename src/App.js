import React, { Component } from 'react';
import uuid from 'uuid';
import Hand from './Components/Hand';
import Player from './Components/Player';
import Enemy from './Components/Enemy';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      isUsersTurn: true,
      endMessage: '',
      status: 'open',
      currentAction: '',
      deck: [],
      hand: [],
      discard: [],
      player: {},
      currentEnemy: {
        name: 'Bad Guy',
        health: 10,
        energy: 200,
        recurringDamage: 0,
        attacks : [
          {
            name: 'Brutal Critic',
            damage: 1,
            recurringDamage: 1,
            cost: 1
          },
          {
            name: 'Leap into Face',
            damage: 4,
            recurringDamage: 0,
            cost: 0
          },
          {
            name: 'Sickness',
            damage: 0,
            recurringDamage: 3,
            cost: 0
          },
        ]
      },
      enemies: []
    };
  }
  componentWillMount() {
    this.setState({player :
    {
      health: 100,
      energy: 100,
      recurringDamage: 0,
      status: null
    }});
    this.setState({deck: [
        {
          id: uuid.v4(),
          cardId: 1,
          name : 'Counter-Argument',
          cost : 1,
          damage : 1,
          recurringDamage : 0
        },
        {
          id: uuid.v4(),
          cardId: 2,
          name : 'Punch in the face',
          cost : 3,
          damage : 3,
          recurringDamage : 0
        },
        {
          id: uuid.v4(),
          cardId: 3,
          name : 'Spot Fallacy',
          cost : 2,
          damage : 1,
          recurringDamage : 2
        },
        {
          id: uuid.v4(),
          cardId: 1,
          name : 'Counter-Argument',
          cost : 1,
          damage : 1,
          recurringDamage : 0
        },
        {
          id: uuid.v4(),
          cardId: 2,
          name : 'Punch in the face',
          cost : 3,
          damage : 3,
          recurringDamage : 0
        },
        {
          id: uuid.v4(),
          cardId: 3,
          name : 'Spot Fallacy',
          cost : 2,
          damage : 1,
          recurringDamage : 2
        }
    ]}, function(){
      this.moveCardsfromDeckToHand(3);
    });
  }


  handleUseCard(id){
    // remove card from copy of hand
    let hand = this.state.hand.slice();
    let index = hand.findIndex(x => x.id === id);
    let card = hand.splice(index, 1);
    if(card.length){
      card = card[0];
    }

    // modify health of currentEnemy
    let enemy = Object.assign({}, this.state.currentEnemy);
    enemy.health -= card.damage;

    // add recurring damage
    if(card.recurringDamage > 0) {
      enemy.recurringDamage += card.recurringDamage;
    }
    this.setState({currentEnemy: enemy});

    // modify energy of player
    let player = Object.assign({}, this.state.player);
    player.energy -= card.cost;
    this.setState({player: player});

    // add card to discard
    let discard = this.state.discard.slice();
    discard.push(card);
    this.setState({discard: discard});

    let message = `You attack ${enemy.name}, with ${card.name}, for ${card.damage} damage`;
    this.setState({currentAction : message});

    // remove card from hand
    this.setState({hand: hand}, () => {
          // get replacement card
          this.moveCardsfromDeckToHand(1)
    });

    // switch turn;
    this.setState({isUsersTurn: false}, () => {
      this.startTurn();
    });
  }

  toggleTurnState(){
    let turnState = this.state.isUsersTurn;
    this.setState({isUsersTurn: !turnState});
  }

  startTurn(){
    if(this.state.isUsersTurn){
      if(this.state.player.health <= 0){
          // game state player has died
          this.setState({endMessage : 'You have died!'});
          this.setState({status : 'lost' });
      } else {

         // apply recurring enemy damage
         let enemy = Object.assign({}, this.state.currentEnemy);
         enemy.heath -= enemy.recurringDamage;
         this.setState({currentEnemy: enemy});
         if(enemy.health <= 0){

           // game state enemy has died
           this.setState({endMessage : 'Hooray! the philosophers are dead.'});
           this.setState({status : 'won'});
           /* TODO eventually this will be load next enemy unless all enemies are dead */
         } else {
            // wait for user action
         }
      }
    } else {
        this.setState({currentAction: ''});
        // apply recurring player damage
        let player = Object.assign({}, this.state.player);
        player.health -= player.recurringDamage;

        if(player.health <= 0){
          // game state player has died
          this.setState({
            player: player,
            endMessage : 'You have died!',
            status : 'lost'});

        } else {
          //  attack player
          let attacks = this.state.currentEnemy.attacks.slice();
          let attack = attacks.splice(Math.floor(Math.random() * attacks.length), 1);
          if(attack.length){
            attack = attack[0];
          }

          // modify energy of enemy
          let enemy = Object.assign({}, this.state.currentEnemy);
          enemy.energy -= attack.cost;
          this.setState({currentEnemy: enemy});

          // modify health of player
          player.health -= attack.damage;

          // add recurring damage
          if(attack.recurringDamage > 0) {
            player.recurringDamage += attack.recurringDamage;
          }

          let message = `${enemy.name} attacks you, with ${attack.name}, for ${attack.damage} damage`;
          this.setState({currentAction : message});
          this.setState({player: player});

          this.setState({isUsersTurn: !this.state.isUsersTurn}, () => {
            this.startTurn();
            this.setState({currentAction : ''});
          });
        }
      /* the time out gives the impression that the enemy is thinking
         at least that's the idea, I thought it would add to the eventual
         feel. Maybe one day, with an AI component, the enemy will start thinking,
         then god save us all!
      */
    }

  }
  moveCardsfromDeckToHand(number) {

    let deck = this.state.deck.slice();
    let hand = this.state.hand.slice();

    for(let i = 0; i < number; i++){
      let card = deck.splice(Math.floor(Math.random() * deck.length), 1);
      if(card.length){
        hand.push(card[0]);
      }
    }
    this.setState({hand: hand});
    this.setState({deck: deck});

  }

  render() {

      if(this.state.status === 'won'){
        return (
          <div className="App">
              <div className="end-screen">
                <div className="player-won">{this.state.endMessage}</div>
                </div>
          </div>
        );
      } else if(this.state.status === 'lost'){ {
        return (
          <div className="App">
              <div className="end-screen">
                  <div className="player-lost">{this.state.endMessage}</div>
              </div>
          </div>
        );
      }
    } else {
      let actionMessage;
      if(this.state.currentAction.length){
        actionMessage = <div className="action-message">{this.state.currentAction}</div>
      }

      let playerCards;
      if(this.state.isUsersTurn){
        playerCards = <Hand cards={this.state.hand} onUse={this.handleUseCard.bind(this)} />;
      } else {
        playerCards = <p>{this.state.hand.length} in the hand, {this.state.deck.length} left in deck.</p>;
      }
      return (
        <div className="App">
          <div className="play-screen">
            <Enemy enemy={this.state.currentEnemy} />
            <Player player={this.state.player} />
            <div className="action-details">{actionMessage}</div>
            <div className="player-cards">{playerCards}</div>
          </div>
        </div>
      );
    }
  }
}

export default App;
