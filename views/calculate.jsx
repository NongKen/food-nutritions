import React from 'react'
import DefaultLayout from './layouts/default'
import styled from 'styled-components'

class Calculate extends React.Component {

  render() {
    return (
      <DefaultLayout title={this.props.title}>
        <h1>Calculate</h1>
        <select name="" id="">
            <option>
                asd
            </option>
            <option>
                asd
            </option>
            <option>
                asd
            </option>
        </select>
        <div>
          
        </div>
      </DefaultLayout>
    );
  }
}

module.exports = Calculate;