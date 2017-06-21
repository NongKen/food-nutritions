import React from 'react'
import DefaultLayout from './layouts/default'
import styled, {injectGlobal} from 'styled-components'

import { Text } from './Base'

class Home extends React.Component {
  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <Text>{'Test'}</Text>
        <h1>Welcome to Booky calculate food program</h1>
        <a href="/calculate">
          <button href={'/calculate'}>Go Calculate</button>
        </a>
        <button href={'/ingredence'}>Add Ingredences</button>
        <div>{this.props.readDB().a}</div>
        <div>{this.props.readDB().ingredences[0].name}</div>
      </DefaultLayout>
    );
  }
}

module.exports = Home;