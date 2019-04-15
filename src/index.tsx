import * as React from 'react'
import { render } from 'react-dom'
import { Bearer } from '@bearer/react'
import { BEARER_CLIENT_ID } from './etc/constants'

// To test different types of integration styles, just switch the uncommented line below
import IntegrationSettings from './test/HOC/IntegrationSettings'
// import IntegrationSettings from './test/hooks/IntegrationSettings'

function App() {
  return (
    <Bearer clientId={BEARER_CLIENT_ID}>
      <div className="App">
        <IntegrationSettings />
      </div>
    </Bearer>
  )
}

const rootElement = document.getElementById('root')
render(<App />, rootElement)
