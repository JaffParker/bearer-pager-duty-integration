import * as React from 'react'
import { INTEGRATION_SETUP_ID, REFERENCE_ID } from './etc/constants'
import SendTestEvent from './integrations-send-event'
import {
  useFetchEscalationPolicies,
  useCreateIntegration,
} from './integrations'

interface Policy {
  id: string
  summary: string
}

export default function IntegrationSettings() {
  const [policies, setEscalationPolicies] = React.useState<Policy[]>()
  const [selectedPolicyKey, setSelectedPolicy] = React.useState<number>(-1)
  const { data, loading } = useFetchEscalationPolicies(INTEGRATION_SETUP_ID)
  const {
    createIntegration,
    data: { referenceId },
  } = useCreateIntegration(INTEGRATION_SETUP_ID)

  const handlePolicyChange = React.useCallback(
    event => {
      setSelectedPolicy(event.target.value)
    },
    [setSelectedPolicy],
  )
  const handleSubmit = React.useCallback(
    event => {
      event.preventDefault()
      createIntegration(policies && policies[selectedPolicyKey])
        .then(data => {
          console.log('Integration details', data)
        })
        .catch(console.error)
    },
    [createIntegration],
  )

  React.useEffect(() => {
    if (data) setEscalationPolicies(data.policies)
  }, [data, setEscalationPolicies])

  if (!policies || loading) {
    return <p>Fetching escalation policies...</p>
  }

  return (
    <form style={{ width: 300 }} onSubmit={handleSubmit}>
      <select
        className="form-control custom-select"
        value={selectedPolicyKey}
        onChange={handlePolicyChange}
      >
        <option>Select an escalation policy</option>
        <option>-------</option>
        {policies.map((policy, key) => (
          <option key={policy.id} value={key}>
            {policy.summary}
          </option>
        ))}
      </select>

      <button type="submit" className="btn btn-primary">
        Save settings
      </button>

      <SendTestEvent referenceId={referenceId || REFERENCE_ID} />
    </form>
  )
}
