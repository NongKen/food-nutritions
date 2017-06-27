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

class Units extends Component {
  constructor() {
    super();
    this.state = {
      unit:'',
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
    let isNewDataIsCorrect = true
    if (!this.state.unit) isNewDataIsCorrect = false
    if (!isNaN(this.state.unit)) isNewDataIsCorrect = false
    if (this.state.data.units.includes(this.state.unit)) isNewDataIsCorrect = false

    if (isNewDataIsCorrect) {
      const newData = { ...this.state.data }
      newData.units.push(this.state.unit)
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

  render() {
    return (
      <div>
        <h1>Add Units</h1>
        {
          this.state.fetchError && <h1>API error Please contact Nong Ken</h1>
        }
        <FormContainer>
          <ItemContainer>
            <Item>
              This is an existing Unit
            </Item>
            <Item>
              <SelectCustomed>
                {
                  this.state.data.units && this.state.data.units.map(unit => {
                    return (
                      <option key={unit} value={unit.toLowerCase()}>{unit}</option>
                    )
                  })
                }
              </SelectCustomed>
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Insert new Unit
            </Item>
            <Item>
              <input placeholder={'unit'} type="text" onKeyUp={(e) => this.setDataState('unit', e.target.value)}/>
            </Item>
          </ItemContainer>
        </FormContainer>
        <div>
          {
            this.state.isSomethingWrong && 'Something Wrong, You new Unit is already exist or You username - password is wrong'
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

export default Units