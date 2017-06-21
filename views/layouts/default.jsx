import React from 'react'
import styled from 'styled-components'

const Body = styled.body`
  margin: 0;
`

const DefaultLayout = (props) => {
  return (
    <html>
      <head><title>{props.title}</title></head>
      <Body>{props.children}</Body>
    </html>
  )
}

export default DefaultLayout