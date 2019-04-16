import * as React from 'react'
import { withEscalationPolicies, withCreateIntegration } from '../../lib'
import { INTEGRATION_SETUP_ID, REFERENCE_ID } from '../../etc/constants'
import SendTestEvent from './SendTestEvent'
import { Policy } from '../../lib/types'

interface EscalationPolicyFormProps {
  policies?: Policy[]
}

const EscalationPolicyForm = withCreateIntegration<EscalationPolicyFormProps>(
  ({ policies, data: referenceId, fetch: createIntegration, loading }) => {
    const [selectedPolicyKey, setSelectedPolicy] = React.useState<number>(-1)
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

    if (!policies) {
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

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save settings'}
        </button>

        <SendTestEvent referenceId={referenceId || REFERENCE_ID} />
      </form>
    )
  },
  INTEGRATION_SETUP_ID,
)

export default withEscalationPolicies(
  ({ data: policies }) => <EscalationPolicyForm policies={policies} />,
  INTEGRATION_SETUP_ID,
)
