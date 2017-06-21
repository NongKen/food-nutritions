import React, {Component} from 'react'
import styled from 'styled-components'

const NavbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #ffb6b6;
`

const NavbarItem = styled.div`
  flex-basis: 10%;
  padding: 12px 40px;
  border: 1px solid;
  cursor: pointer;
`

class Navbar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <NavbarContainer>
        <NavbarItem onClick={() => this.props.setDisplay('home')}>
          Booky Logo
        </NavbarItem>
        <NavbarItem onClick={() => this.props.setDisplay('home')}>
          Home
        </NavbarItem>
        <NavbarItem onClick={() => this.props.setDisplay('home')}>
          Calculate Nutritions
        </NavbarItem>
        <NavbarItem onClick={() => this.props.setDisplay('ingredient')}>
          Add ingredients
        </NavbarItem>
      </NavbarContainer>
    )
  }
}

export default Navbar