import { factory } from '@bearer/react'
import { INTEGRATION_NAME } from '../../etc/constants'

const { withFunctionCall } = factory(INTEGRATION_NAME)

export const withEscalationPolicies = withFunctionCall<any>(
  'listEscalationPolicies',
)
