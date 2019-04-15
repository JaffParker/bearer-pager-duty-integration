import { useState, useContext, useCallback } from 'react'
import { EventResult } from '../types'
import { BearerContext } from '@bearer/react'
import { INTEGRATION_NAME } from '../../etc/constants'

export const useSendEvent = (INTEGRATION_SETUP_ID: string) => {
  const [loading, setLoading] = useState(false)
  const [eventResult, setEventResult] = useState<EventResult>()
  const [error, setError] = useState<any>()
  const { bearer } = useContext(BearerContext)

  const sendEvent = useCallback((referenceId: string) => {
    setLoading(true)
    return bearer
      .functionFetch<EventResult>(INTEGRATION_NAME, 'sendEvent', {
        query: {
          setupId: INTEGRATION_SETUP_ID,
          referenceId,
        },
      })
      .then(result => {
        setEventResult(result.data)
        return result.data
      })
      .catch(error => {
        setError(error)
        return error
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return { loading, data: { eventResult }, error, sendEvent }
}
