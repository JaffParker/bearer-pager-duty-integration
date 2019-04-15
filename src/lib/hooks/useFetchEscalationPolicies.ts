import { useState, useContext, useEffect } from 'react'
import { BearerContext } from '@bearer/react'
import { INTEGRATION_NAME } from '../../etc/constants'
import { Policy } from '../types'

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
