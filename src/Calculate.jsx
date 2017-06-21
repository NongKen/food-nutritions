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

const Table = styled.div`
  margin-top: 30px;
`

const TableRow = styled.div`
  display: flex;
  justify-content: space-around;
`

const TableItem = styled.div`
  flex-basis: 100%;
  text-align: center;
  border: 1px solid;
`

class Calculate extends Component {
  constructor() {
    super();
    this.state = {
      selectCategory: -1,
      selectIngredient: {category: -1, ingredient: -1},
      weight: 0,
      selectIngredients: [],
      summary: {carb: 0, protein: 0, fat: 0, cals: 0},
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

  setIngredient(state, value) {
    const newState = {}
    newState[state] = JSON.parse(value)
    this.setState(newState)
  }

  setCategory(state, value) {
    const newState = {}
    newState[state] = JSON.parse(value)
    newState.selectIngredient = {category: -1, ingredient: -1}
    this.setState(newState)
  }

  addIngredient() {
    if (this.state.weight > 0 && this.state.selectIngredient.category !== -1 && this.state.selectIngredient.ingredient !== -1) {
      const newState = {}
      const summary = this.state.summary
      newState.selectIngredients = this.state.selectIngredients
      newState.selectIngredients.push({ingredient: this.state.selectIngredient, weight: this.state.weight})

      summary.carb += this.state.data.ingredients[this.state.selectIngredient.category].children[this.state.selectIngredient.ingredient].carb * this.state.weight
      summary.protein += this.state.data.ingredients[this.state.selectIngredient.category].children[this.state.selectIngredient.ingredient].protein * this.state.weight
      summary.fat += this.state.data.ingredients[this.state.selectIngredient.category].children[this.state.selectIngredient.ingredient].fat * this.state.weight
      summary.cals += this.state.data.ingredients[this.state.selectIngredient.category].children[this.state.selectIngredient.ingredient].calories * this.state.weight

      newState.selectIngredients.summary = summary
      this.setState(newState)
    }
  }

  deleteIngredient(index) {
    const newState = {}
    const summary = this.state.summary
    newState.selectIngredients = this.state.selectIngredients

    const removedIngredient = newState.selectIngredients.splice(index, 1)
    summary.carb -= this.state.data.ingredients[removedIngredient[0].ingredient.category].children[removedIngredient[0].ingredient.ingredient].carb * removedIngredient[0].weight
    summary.protein -= this.state.data.ingredients[removedIngredient[0].ingredient.category].children[removedIngredient[0].ingredient.ingredient].protein * removedIngredient[0].weight
    summary.fat -= this.state.data.ingredients[removedIngredient[0].ingredient.category].children[removedIngredient[0].ingredient.ingredient].fat * removedIngredient[0].weight
    summary.cals -= this.state.data.ingredients[removedIngredient[0].ingredient.category].children[removedIngredient[0].ingredient.ingredient].calories * removedIngredient[0].weight

    newState.selectIngredients.summary = summary
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
    const ingredientList = []
    this.state.data.ingredients && this.state.data.ingredients.forEach((category, categoryIndex) => {
      if (this.state.selectCategory == -1 || this.state.selectCategory == categoryIndex) {
        category.children.forEach((ingredient, ingredientIndex) => {
          ingredientList.push(<option key={`${categoryIndex}${ingredientIndex}`} value={JSON.stringify({category: categoryIndex, ingredient: ingredientIndex})}>{`${ingredient.name} ${ingredient.unit}`}</option>)
        })
      }
    })
    return (
      <div>
        <h1>Calculate Nutritions</h1>
        {
          this.state.fetchError && <h1>API error Please contact Nong Ken</h1>
        }
        <FormContainer>
          <ItemContainer>
            <Item>
              Category
            </Item>
            <Item>
              <SelectCustomed onChange={(e) => this.setCategory('selectCategory', e.target.value)}>
                <option value={-1}>{'All'}</option>
                {
                  this.state.data.ingredients && this.state.data.ingredients.map((category, categoryIndex) => {
                    return (
                      <option key={category.category} value={categoryIndex}>{category.category}</option>
                    )
                  })
                }
              </SelectCustomed>
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Ingredence
            </Item>
            <Item>
              <SelectCustomed onChange={(e) => this.setIngredient('selectIngredient', e.target.value)} value={JSON.stringify(this.state.selectIngredient)}>
                <option value={JSON.stringify({category: -1, ingredient: -1})}>{'None'}</option>
                {
                  ingredientList
                }
              </SelectCustomed>
            </Item>
          </ItemContainer>
          <ItemContainer>
            <Item>
              Weight
            </Item>
            <Item>
              <input placeholder={'Weight'} type="text" onKeyUp={(e) => this.setDataState('weight', e.target.value)}/>
            </Item>
          </ItemContainer>
        </FormContainer>
        <div>
          {
            this.state.isSomethingWrong && 'Something Wrong, You new Category is already exist or You username - password is wrong'
          }
        </div>
        <div>
          <button onClick={() => this.addIngredient()}>
            Add Ingredence
          </button>
        </div>

        <Table>
          <TableRow>
            <TableItem>
              name
            </TableItem>
            <TableItem>
              weight
            </TableItem>
            <TableItem>
              carbohydrate
            </TableItem>
            <TableItem>
              protein
            </TableItem>
            <TableItem>
              fat
            </TableItem>
            <TableItem>
              calories
            </TableItem>
            <TableItem>
              Remove
            </TableItem>
          </TableRow>
          {
            this.state.selectIngredients.map((ingredient, index) => {
              return (
                <TableRow key={index}>
                  <TableItem>
                    {`${this.state.data.ingredients[ingredient.ingredient.category].children[ingredient.ingredient.ingredient].name} ${this.state.data.ingredients[ingredient.ingredient.category].children[ingredient.ingredient.ingredient].unit}`}
                  </TableItem>
                  <TableItem>
                    {ingredient.weight}
                  </TableItem>
                  <TableItem>
                    {(this.state.data.ingredients[ingredient.ingredient.category].children[ingredient.ingredient.ingredient].carb * ingredient.weight).toFixed(3)}
                  </TableItem>
                  <TableItem>
                    {(this.state.data.ingredients[ingredient.ingredient.category].children[ingredient.ingredient.ingredient].protein * ingredient.weight).toFixed(3)}
                  </TableItem>
                  <TableItem>
                    {(this.state.data.ingredients[ingredient.ingredient.category].children[ingredient.ingredient.ingredient].fat * ingredient.weight).toFixed(3)}
                  </TableItem>
                  <TableItem>
                    {(this.state.data.ingredients[ingredient.ingredient.category].children[ingredient.ingredient.ingredient].calories * ingredient.weight).toFixed(3)}
                  </TableItem>
                  <TableItem>
                    <button onClick={() => this.deleteIngredient(index)}>Remove</button>
                  </TableItem>
                </TableRow>
              )
            })
          }
          <TableRow>
            <TableItem>
              Summary
            </TableItem>
            <TableItem>
              - -
            </TableItem>
            <TableItem>
              {this.state.summary.carb.toFixed(3)}
            </TableItem>
            <TableItem>
              {this.state.summary.protein.toFixed(3)}
            </TableItem>
            <TableItem>
              {this.state.summary.fat.toFixed(3)}
            </TableItem>
            <TableItem>
              {this.state.summary.cals.toFixed(3)}
            </TableItem>
            <TableItem>

            </TableItem>
          </TableRow>
        </Table>
      </div>
    )
  }
}

export default Calculate