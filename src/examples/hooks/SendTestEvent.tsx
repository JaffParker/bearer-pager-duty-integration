import * as React from 'react'
import { useSendEvent } from '../../lib'
import { INTEGRATION_SETUP_ID } from '../../etc/constants'

interface SendTestEventProps {
  referenceId?: string
}

export default function SendTestEvent({ referenceId }: SendTestEventProps) {
  const { sendEvent } = useSendEvent(INTEGRATION_SETUP_ID)

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
      disabled={!referenceId}
      className="btn btn-secondary"
      onClick={handleSendEvent}
    >
      Send test event
    </button>
  )
}
