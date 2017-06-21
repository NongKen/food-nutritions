import styled from 'styled-components'

const Base = styled.div`
  ${(props) => !props['no-padding'] && 'padding: 8px;' }
`

const Text = styled.div`
  font-weight: bold;
`

export {Text}