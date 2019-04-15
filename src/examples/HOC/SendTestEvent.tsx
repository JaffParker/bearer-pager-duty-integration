import * as React from 'react'
import { withSendEvent } from '../../lib'
import { INTEGRATION_SETUP_ID } from '../../etc/constants'
import { SendEventProps } from '../../lib/HOC/withSendEvent'

interface SendTestEventProps {
  referenceId?: string
}

const SendTestEvent: React.FC<SendEventProps & SendTestEventProps> = ({
  referenceId,
  fetch: sendEvent,
  loading,
}) => {
  const handleSendEvent = React.useCallback(() => {
    if (referenceId)
      sendEvent(referenceId)
        .then(data => {
          console.log('Event details', data)
          alert(JSON.stringify(data))
        })
        .catch(console.error)
  }, [sendEvent, referenceId])

  return (
    <button
      type="button"
      disabled={!referenceId || loading}
      className="btn btn-secondary"
      onClick={handleSendEvent}
    >
      {loading ? 'Loading...' : 'Send test event'}
    </button>
  )
}

export default withSendEvent(SendTestEvent, INTEGRATION_SETUP_ID)
