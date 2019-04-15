import { INTEGRATION_NAME } from '../../etc/constants'
import { factory } from '@bearer/react'

const { withFunctionCall } = factory(INTEGRATION_NAME)

export const withCreateIntegration = withFunctionCall<any>('createIntegration')
