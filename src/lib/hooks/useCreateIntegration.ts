import { useState, useContext, useCallback } from 'react'
import { BearerContext } from '@bearer/react'
import { Policy } from '../types'
import { INTEGRATION_NAME } from '../../etc/constants'

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
