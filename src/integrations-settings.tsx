import * as React from 'react'
import { BearerContext } from '@bearer/react/lib/bearer-provider'
import {
  INTEGRATION_NAME,
  INTEGRATION_SETUP_ID,
  REFERENCE_ID,
} from './etc/constants'
import SendTestEvent from './integrations-send-event'

export default class IntegrationSettings extends React.Component<any, any> {
  static contextType = BearerContext
  context!: React.ContextType<typeof BearerContext>

  fetchEscalationPolicies = () => {
    this.context.bearer
      .functionFetch(INTEGRATION_NAME, 'listEscalationPolicies', {
        query: { setupId: INTEGRATION_SETUP_ID },
      })
      .then(({ data }) => {
        this.setState({ policies: data })
      })
      .catch(console.error)
  }

  createIntegration = (e: any) => {
    e.preventDefault()
    const policy = this.state.policies[this.state.policy]

    if (!policy) {
      return
    }

    this.setState({ referenceId: null })

    this.context.bearer
      .functionFetch(INTEGRATION_NAME, 'createIntegration', {
        query: {
          setupId: INTEGRATION_SETUP_ID,
          referenceId: this.state.referenceId,
        },
        escalationPolicy: policy,
      })
      .then(data => {
        console.log('Integration details', data)
        this.setState({ referenceId: data.referenceId })
      })
      .catch(console.error)
  }

  setEscalationPolicy = (event: any) => {
    this.setState({ policy: event.target.value })
  }

  constructor(props: any) {
    super(props)
    this.state = {
      isConfigured: false,
      policies: [],
      policy: '',
      referenceId: REFERENCE_ID,
    }
  }

  componentWillMount() {
    this.fetchEscalationPolicies()
  }

  render() {
    if (!this.state.policies) {
      return (
        <button onClick={this.fetchEscalationPolicies}>
          Fetch escalation policies
        </button>
      )
    }

    return (
      <form style={{ width: 300 }} onSubmit={this.createIntegration}>
        <select
          className="form-control custom-select"
          value={this.state.policy}
          onChange={this.setEscalationPolicy}
        >
          <option>Select an escalation policy</option>
          <option>-------</option>
          {this.state.policies.map((policy: any, key: number) => (
            <option key={policy.id} value={key}>
              {policy.summary}
            </option>
          ))}
        </select>

        <button type="submit" className="btn btn-primary">
          Save settings
        </button>

        <SendTestEvent referenceId={this.state.referenceId} />
      </form>
    )
  }
}
