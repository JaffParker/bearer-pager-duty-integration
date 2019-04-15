import * as React from 'react'
import { render } from 'react-dom'
import { Bearer } from '@bearer/react'

import { BEARER_CLIENT_ID } from './etc/constants'
import IntegrationSettings from './integrations-settings'

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
