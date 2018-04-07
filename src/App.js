import React, { Component } from "react";
import Card from "./components/Card";
import Wrapper from "./components/Wrapper";
import Title from "./components/Title";
import cards from "./cards.json";
import "./App.css";

class App extends Component {
  state = { characters: cards,
            text: "Click any character to begin",
            currWins: 0,
            bestWins: 0,
            perfects: 0 };

  componentDidMount() {
    // add class to Cards
    const cards = this.state.characters;
    cards.forEach(card => card.class = "imgNormal")
    cards.forEach(card => card.clicked = false)
    this.setState({ characters: cards })
  }

  hover = (id, over) => {
    const cards = this.state.characters;
    cards[id].class = (over ? "imgHover" : "imgNormal");
    this.setState({ characters: cards })
  }

  guess = (id) => {
    let cards = this.state.characters
    let card = cards[id]
    let clicked = card.clicked
    let character = card.name
    card.clicked = true
    cards[id].class = "imgNormal"
    cards[id]  = card
    let shuffled = cards.map((a) => ({sort: Math.random(), value: a}))
                        .sort((a, b) => a.sort - b.sort)
                        .map((a, i) =>  { a.value.id = i
                                          return a.value})
    shuffled[id].class = "imgHover"
    if (clicked) {
      if (this.state.currWins > this.state.bestWins) {
        this.setState({bestWins: this.state.currWins});
      }
      this.setState({currWins: 0 })
      this.setState({text: "Opps, you picked " + character + " TWICE. Starting new game !!!"})
      cards = shuffled.map((a) => { a.clicked = false
                                    return a })
    } else {
      if (this.state.currWins < cards.length-1) {
        this.setState({ currWins: this.state.currWins + 1 })
        this.setState({text: "Alight, 1st pick of " + character + " this game."})
        cards = shuffled
      } else {
        this.setState({perfects: this.state.perfects+1});
        this.setState({bestWins: this.state.currWins+1});
        this.setState({currWins: 0 })
        this.setState({text: "Perfect, " + character + " was the last one. Starting new game !!!"})
        cards = shuffled.map((a) => { a.clicked = false
                                      return a })
      }
    }
    this.setState({characters: cards})
  };

  render() {
    return (
      <Wrapper>
        <Title
          text = {this.state.text}
          curr = {this.state.currWins}
          best = {this.state.bestWins}
          wins = {this.state.perfects}
        />
          {this.state.characters.map(card => (
            <Card
              guess = {this.guess}
              hover = {this.hover}
              id = {card.id}
              key = {card.id}
              class = {card.class}
              name = {card.name}
              image = {card.image}
              clicked = {card.clicked}
            />
          ))}
      </Wrapper>
    );
  }
}

export default App;
