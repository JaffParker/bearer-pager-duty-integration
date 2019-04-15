import { factory, BearerContext } from '@bearer/react'
import { INTEGRATION_NAME } from './etc/constants'
import { useState, useEffect, useContext, useCallback } from 'react'

export const { withFunctionCall, Connect } = factory(INTEGRATION_NAME)

export const withEscalationPolicies = withFunctionCall<any>(
  'listEscalationPolicies',
)
export const withCreateIntegration = withFunctionCall<any>('createIntegration')
export const withSendTestEvent = withFunctionCall<any>('sendEvent')

interface Policy {
  id: string
  summary: string
}

export const useFetchEscalationPolicies = (INTEGRATION_SETUP_ID: string) => {
  const [loading, setLoading] = useState(false)
  const [policies, setPolicies] = useState<Policy[]>()
  const [error, setError] = useState<any>()
  const { bearer } = useContext(BearerContext)

  useEffect(() => {
    setLoading(true)

    bearer
      .functionFetch(INTEGRATION_NAME, 'listEscalationPolicies', {
        query: { setupId: INTEGRATION_SETUP_ID },
      })
      .then(({ data }) => {
        setPolicies(data)
      })
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  const fetchEscalationPolicies = useCallback(() => {
    setLoading(true)

    return bearer
      .functionFetch(INTEGRATION_NAME, 'listEscalationPolicies', {
        query: { setupId: INTEGRATION_SETUP_ID },
      })
      .then(({ data }) => {
        setPolicies(data)
        return data
      })
      .catch(error => {
        setError(error)
        return error
      })
      .finally(() => setLoading(false))
  }, [setLoading, INTEGRATION_SETUP_ID, setPolicies, setError])

  return { loading, data: { policies }, error }
}

export const useCreateIntegration = (INTEGRATION_SETUP_ID: string) => {
  const [loading, setLoading] = useState(false)
  const [referenceId, setReferenceId] = useState<string>()
  const [error, setError] = useState<any>()
  const { bearer } = useContext(BearerContext)

  const createIntegration = useCallback(
    (policy: Policy | undefined) => {
      setLoading(true)
      return bearer
        .functionFetch(INTEGRATION_NAME, 'createIntegration', {
          query: {
            setupId: INTEGRATION_SETUP_ID,
          },
          escalationPolicy: policy,
        })
        .then(({ referenceId }) => {
          setReferenceId(referenceId)
          return referenceId
        })
        .catch(error => {
          setError(error)
          return error
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [setLoading, INTEGRATION_SETUP_ID, setReferenceId, setError],
  )

  return { loading, data: { referenceId }, error, createIntegration }
}

interface EventResult {
  data: {
    status: 'success'
    message: string
    incident_key: string
  }
  referenceId?: string
}
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
