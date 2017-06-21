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

class Ingredients extends Component {
  constructor() {
    super();
    this.state = {
      category: '',
      name: '',
      weight: '',
      unit: 'Gram',
      carb: '',
      protein: '',
      fat: '',
      cals: '',
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
    fetch(`${this.props.appUrl}/api/getDB`, { headers, method: 'GET' })
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
      if (!this.state.name) isNewDataIsCorrect = false
      if (!this.state.unit) isNewDataIsCorrect = false
      if (!(+this.state.weight)) isNewDataIsCorrect = false

      if (!isNaN(this.state.category)) isNewDataIsCorrect = false
      if (!isNaN(this.state.name)) isNewDataIsCorrect = false
      if (!isNaN(this.state.unit)) isNewDataIsCorrect = false
      if (isNaN(this.state.weight)) isNewDataIsCorrect = false
      if (isNaN(this.state.carb)) isNewDataIsCorrect = false
      if (isNaN(this.state.protein)) isNewDataIsCorrect = false
      if (isNaN(this.state.fat)) isNewDataIsCorrect = false
      if (isNaN(this.state.cals)) isNewDataIsCorrect = false
      

      if (isNewDataIsCorrect) {
        const newData = { ...this.state.data }
        
        newData.ingredients = newData.ingredients.map((category, index) => {
          if (category.category === this.state.category) {
            const tempCategory = {...category}
            tempCategory.children.push({
              name: this.state.name,
              unit: this.state.unit,
              carb: (+this.state.carb / +this.state.weight),
              fat: (+this.state.fat / +this.state.weight),
              protein: (+this.state.protein / +this.state.weight),
              calories: (+this.state.cals  / +this.state.weight),
            })
            return tempCategory
          }
          return category
        })
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
        <h1>Add ingredients</h1>
        {
          this.state.fetchError && <h1>API error Please contact Nong Ken</h1>
        }
        <FormContainer>
          <ItemContainer>
            <Item>
              Ingredence Category
            </Item>
            <Item>
              <SelectCustomed name="category" onChange={(e) => this.setDataState('category', e.target.value)}>
                <option value={''}>{''}</option>
                {
                  this.state.data.ingredients && this.state.data.ingredients.map(category => {
                    return (
                      <option key={category.category} value={category.category}>{category.category}</option>
                    )
                  })
                }
              </SelectCustomed>
            </Item>
            <div>
              {' Not found Category that you want please '}
              <button onClick={() => this.props.setDisplay('category')}>
                Add More Category
              </button>
            </div>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Ingredence name
            </Item>
            <Item>
              <input placeholder={'Name'} type="text" onKeyUp={(e) => this.setDataState('name', e.target.value)}/>
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Ingredence Weight
            </Item>
            <Item>
              <input placeholder={'Weight'} type="text" onKeyUp={(e) => this.setDataState('weight', e.target.value)}/>
            </Item>
            <Item>
              <SelectCustomed name="unit" onChange={(e) => this.setDataState('unit', e.target.value)}>
                {
                  this.state.data.units && this.state.data.units.map(unit => {
                    return (
                      <option key={unit} value={unit}>{unit}</option>
                    )
                  })
                }
              </SelectCustomed>
            </Item>
            <div>
              {' Not found Unit that you want please '}
              <button onClick={() => this.props.setDisplay('unit')}>
                Add More Unit
              </button>
            </div>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Given Carbohydrate
            </Item>
            <Item>
              <input placeholder={'Carbohydrate'} type="text" onKeyUp={(e) => this.setDataState('carb', e.target.value)}/>
            </Item>
            <div>
              * Only g(Gram) Units
            </div>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Given Protein
            </Item>
            <Item>
              <input placeholder={'Protein'} type="text" onKeyUp={(e) => this.setDataState('protein', e.target.value)}/>
            </Item>
            <div>
              * Only g(Gram) Units
            </div>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Given Fat
            </Item>
            <Item>
              <input placeholder={'Fat'} type="text" onKeyUp={(e) => this.setDataState('fat', e.target.value)}/>
            </Item>
            <div>
              * Only g(Gram) Units
            </div>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Given Calcories
            </Item>
            <Item>
              <input placeholder={'Calcories'} type="text" onKeyUp={(e) => this.setDataState('cals', e.target.value)}/>
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Booky Username
            </Item>
            <Item>
              <input placeholder={'Username'} type="text" onKeyUp={(e) => this.setDataState('username', e.target.value)}/>
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Booky password
            </Item>
            <Item>
              <input placeholder={'Password'} type="password" onKeyUp={(e) => this.setDataState('password', e.target.value)}/>
            </Item>
          </ItemContainer>
        </FormContainer>
        <div>
          {
            this.state.isSomethingWrong && 'Something Wrong, You input are incorrect format or You password is wrong'
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

export default Ingredients