import React, {Component} from 'react'
import styled from 'styled-components'

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const ItemContainer = styled.div`
  display: flex;
  padding: 8px;
`

const Item = styled.div`
  width: 150px;
`

const SelectCustomed = styled.select`
  width: 100%
`

class Categories extends Component {
  constructor() {
    super();
    this.state = {
      category:'',
      username: '',
      password: '',
      isSomethingWrong: false,
      fetchError: false,
      data: {}
    }
  }

  componentWillMount() {
    const headers = new Headers()
    headers.append('Content-Type', 'application/json')
    fetch(`${this.props.appUrl}/api/getDB`, { headers, method: 'GET'})
    .then((response) => {
      response.json()
      .then((json) => {
        this.setState({data: json})
      })
      .catch((error) => {
        this.setState({fetchError: true})
      })
    })
    .catch((error) => {
      this.setState({fetchError: true})
    })
  }

  setDataState(state, value) {
    const newState = {}
    newState[state] = value
    this.setState(newState)
  }

  saveDB() {
    if (this.state.username === this.state.data.user.username && this.state.password === this.state.data.user.password) {
      let isNewDataIsCorrect = true
      if (!this.state.category) isNewDataIsCorrect = false
      if (!isNaN(this.state.category)) isNewDataIsCorrect = false
      this.state.data.ingredients.forEach((category) => {
        if (category.category === this.state.category) isNewDataIsCorrect = false
      })

      if (isNewDataIsCorrect) {
        const newData = { ...this.state.data }
        newData.ingredients.push({category: this.state.category, children: []})
        const headers = new Headers()
        headers.append('Content-Type', 'application/json')
        fetch(`${this.props.appUrl}/api/saveDB?json=${JSON.stringify(newData)}`, { headers, method: 'GET' })
        .then((response) => {
          if(response.ok) this.props.setDisplay('home')
          else this.setState({fetchError: true})
        })
        .catch((error) => {
          this.setState({fetchError: true})
        })
      }
      else this.setState({isSomethingWrong: true})
    }
    else this.setState({isSomethingWrong: true})
  }

  render() {
    return (
      <div>
        <h1>Add Categories</h1>
        {
          this.state.fetchError && <h1>API error Please contact Nong Ken</h1>
        }
        <FormContainer>
          <ItemContainer>
            <Item>
              This is an existing Category
            </Item>
            <Item>
              <SelectCustomed>
                {
                  this.state.data.ingredients && this.state.data.ingredients.map(category => {
                    return (
                      <option key={category.category} value={category.category}>{category.category}</option>
                    )
                  })
                }
              </SelectCustomed>
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Insert new Category
            </Item>
            <Item>
              <input placeholder={'category'} type="text" onKeyUp={(e) => this.setDataState('category', e.target.value)}/>
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Username
            </Item>
            <Item>
              <input placeholder={'Username'} type="text" onKeyUp={(e) => this.setDataState('username', e.target.value)}/>
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              password
            </Item>
            <Item>
              <input placeholder={'Password'} type="password" onKeyUp={(e) => this.setDataState('password', e.target.value)}/>
            </Item>
          </ItemContainer>
        </FormContainer>
        <div>
          {
            this.state.isSomethingWrong && 'Something Wrong, You new Category is already exist or You username - password is wrong'
          }
        </div>
        <div>
          <button onClick={() => this.saveDB()}>
            Add Ingredence
          </button>
        </div>
      </div>
    )
  }
}

export default Categories