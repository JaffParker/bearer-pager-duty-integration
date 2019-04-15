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

  return { loading, data: { policies }, error }
}

export const useCreateIntegration = (
  policy: Policy,
  INTEGRATION_SETUP_ID: string,
) => {
  const [start, setStart] = useState(false)

  const [loading, setLoading] = useState(false)
  const [referenceId, setReferenceId] = useState<string>()
  const [error, setError] = useState<any>()
  const { bearer } = useContext(BearerContext)

  useEffect(() => {
    if (start) {
      setLoading(true)

      bearer
        .functionFetch(INTEGRATION_NAME, 'createIntegration', {
          query: {
            setupId: INTEGRATION_SETUP_ID,
          },
          escalationPolicy: policy,
        })
        .then(({ referenceId }) => {
          setReferenceId(referenceId)
        })
        .catch(setError)
        .finally(() => {
          setLoading(false)
          setStart(false)
        })
    }
  }, [start])

  const createIntegration = useCallback(() => {
    setStart(true)
  }, [])

  return { loading, data: { referenceId }, error, createIntegration }
}

export const sendEvent = (INTEGRATION_SETUP_ID: string) => {
  const [start, setStart] = useState(false)

  const [referenceId, setReferenceId] = useState('')
  const [loading, setLoading] = useState(false)
  const [eventResult, setEventResult] = useState<any>()
  const [error, setError] = useState<any>()
  const { bearer } = useContext(BearerContext)

  useEffect(() => {
    if (start) {
      setLoading(true)
      bearer
        .functionFetch(INTEGRATION_NAME, 'sendEvent', {
          query: {
            setupId: INTEGRATION_SETUP_ID,
            referenceId,
          },
        })
        .then(setEventResult)
        .catch(setError)
        .finally(() => {
          setLoading(false)
          setStart(false)
        })
    }
  }, [referenceId, start])

  const sendEvent = useCallback((referenceId: string) => {
    setReferenceId(referenceId)
    setStart(true)
  }, [])

  return { loading, data: { eventResult }, error, sendEvent }
}
