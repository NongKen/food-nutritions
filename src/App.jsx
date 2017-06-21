import React, {Component} from 'react'
import styled from 'styled-components'
import { Context, Container } from './Base'

import Home from './Home'
import Calculate from './Calculate'
import Ingredients from './Ingredients'
import Units from './Units'
import Categories from './Categories'
import Navbar from './Navbar'

class App extends Component {
  constructor() {
    super();
    this.state = { display: 'home'}
  }

  setDisplay(display) {
    if (display) {
      this.setState({ display })
    }
  }
  render() {
    console.log()
    return (
      <Context>
        <Navbar setDisplay={(display) => this.setDisplay(display)} />
        <Container>
          {
            this.state.display === 'home' && <Home setDisplay={(display) => this.setDisplay(display)}/>
          }
          {
            this.state.display === 'calculate' && <Calculate setDisplay={(display) => this.setDisplay(display)} appUrl={this.props.appUrl}/>
          }
          {
            this.state.display === 'ingredient' && <Ingredients setDisplay={(display) => this.setDisplay(display)} appUrl={this.props.appUrl}/>
          }
          {
            this.state.display === 'unit' && <Units setDisplay={(display) => this.setDisplay(display)} appUrl={this.props.appUrl}/>
          }
          {
            this.state.display === 'category' && <Categories setDisplay={(display) => this.setDisplay(display)} appUrl={this.props.appUrl}/>
          }
        </Container>
      </Context>
    )
  }
}

export default App