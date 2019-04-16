import { FetchProps, Policy } from '../types'
import React, { ComponentType } from 'react'
import { useFetchEscalationPolicies } from '../hooks/useFetchEscalationPolicies'

export type EscalationPoliciesFetchProps = Pick<
  FetchProps<Policy[]>,
  'loading' | 'data' | 'error'
>

export function withEscalationPolicies<P = {}>(
  Component: ComponentType<EscalationPoliciesFetchProps & P>,
  INTEGRATION_SETUP_ID: string,
): ComponentType<P> {
  return (props: P) => {
    const { data, ...fetchEscalationPolicies } = useFetchEscalationPolicies(
      INTEGRATION_SETUP_ID,
    )

    return (
      <Component {...props} data={data.policies} {...fetchEscalationPolicies} />
    )
  }
}
