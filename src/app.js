import React from 'react';
import Butter from 'buttercms';
import Header from '../src/header';
import IdeaPost from '../src/ideaPost';

var createReactClass = require('create-react-class');
const butter = Butter('b60a008584313ed21803780bc9208557b3b49fbb');
const TRELLO_TOKEN='3f21f8a33bb2beadba98370995c391d0d3969bda1444685360d80d346697a561';
const TRELLO_KEY='eeb8ec9509ebd9b6b846b0728c0bc8b1';
var App = createReactClass({
  getInitialState: function() {
    return {loaded: false, isRecent: true, oldData: "{}"};
  },
  //returns all the cards on trello board in an array
  //TODO: Used a hack to nest objects in react state, clean that up later because
  //objects shouldn't be nested like that to begin with.
  componentWillMount: function() {
    fetch('http://localhost:8080/api/cards', {
      method: 'GET',
    }).then(x => {return x.text()}).then(JSON.stringify()).then((x) => {
      this.setState({
        loaded: true,
        data: x
      });
    });
  },
  sortIdeas: function() {
    if(!this.state.isRecent) {
      this.setState({
        data: this.state.oldData,
        isRecent: true
      })
      return;
    }
    new Promise((resolve, reject) => {
      let sortByUpvotes = []
      let cards = JSON.parse(this.state.data);
      for (let i in cards) {
        let upvotes = 0;
        if(cards[i].desc.indexOf("Upvotes: ")!=-1) {
          if(cards[i].desc.indexOf("Edited")==-1) {
            upvotes = cards[i].desc.substring(cards[i].desc.indexOf("Upvotes: ")+("Upvotes: ").length, cards[i].desc.length);
          } else {
            upvotes = cards[i].desc.substring(cards[i].desc.indexOf("Upvotes: ")+("Upvotes: ").length, cards[i].desc.indexOf("Edited"));
          }
        }
        sortByUpvotes.push([upvotes,cards[i]]);
      }
      let sorted = sortByUpvotes.sort().reverse();
      let sortedCards = [];
      for (let i in sorted) sortedCards.push(sorted[i][1]);
      resolve(sortedCards);
      reject("whoops");
    }).then(sortedCards  => {
      this.setState((prevState,props) => {return {
        oldData: prevState.data
      }});
      this.setState({
        data: JSON.stringify(sortedCards)
      });
      this.setState({
        isRecent: false
      });
    });
  },
  render: function() {
    if (this.state.loaded) {
      return (
        <div>
          <Header sortIdeas = {this.sortIdeas} />
          {
            JSON.parse(this.state.data).map((card) => {
          return (
            <div key={card.desc}>
            <IdeaPost ideaName = {card.name} ideaDesc = {card.desc} />
            </div>
          )
          })}

          <style jsx>{`
            html {
              background-color: #3C989E;
            }
            `}</style>
        </div>
      );
    } else {
      return (
        <div>
              <Header />
              <h2 className = "idea">Loading...</h2>
              <style jsx>{`
                .idea {
                  background-color: #F4CDA5;
                  padding: 12px;
                  border-radius: 8px;
                  font-weight: bold;
                }
                html {
                  background-color: #3C989E;
                }
                `}</style>
              </div>
            );
    }
  }
});

export default App;
