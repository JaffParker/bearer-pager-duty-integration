import * as React from 'react'
import { render } from 'react-dom'
import { Bearer } from '@bearer/react'
import { BEARER_CLIENT_ID } from './etc/constants'
import './styles.css'

// To test different types of integration styles, just switch the uncommented line below
import IntegrationSettings from './examples/HOC/IntegrationSettings'
// import IntegrationSettings from './test/hooks/IntegrationSettings'

function App() {
  return (
    <div className="App">
      <Bearer clientId={BEARER_CLIENT_ID}>
        <IntegrationSettings />
      </Bearer>
    </div>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
