import * as React from 'react'
import { INTEGRATION_NAME, INTEGRATION_SETUP_ID } from './etc/constants'
import { BearerContext } from '@bearer/react/lib/bearer-provider'

export default class SendTestEvent extends React.Component<any> {
  static contextType = BearerContext
  context!: React.ContextType<typeof BearerContext>

  sendEvent = (e: any) => {
    e.preventDefault()
    this.context.bearer
      .functionFetch(INTEGRATION_NAME, 'sendEvent', {
        query: {
          setupId: INTEGRATION_SETUP_ID,
          referenceId: this.props.referenceId,
        },
      })
      .then(data => {
        console.log('Event details', data)
        alert(JSON.stringify(data))
      })
      .catch(console.error)
  }

  handleSubmit = (e: any) => {
    e.preventDefault()
  }

  render() {
    return (
      <button
        type="button"
        disabled={!this.props.referenceId}
        className="btn btn-secondary"
        onClick={this.sendEvent}
      >
        Send test event
      </button>
    )
  }
}
