import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styled, {injectGlobal} from 'styled-components'

import App from './App'

const appUrl = 'https://booky-proram.appspot.com'

injectGlobal`
  body { margin: 0;}
`

ReactDOM.render(
  <App appUrl={appUrl}/>,
  document.getElementById('root')
)