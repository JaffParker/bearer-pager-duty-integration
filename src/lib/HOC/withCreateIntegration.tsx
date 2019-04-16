import React, { ComponentType } from 'react'
import { FetchProps } from '../types'
import { useCreateIntegration } from '../hooks/useCreateIntegration'

export type CreateIntegrationFetchProps = FetchProps<string>

export function withCreateIntegration<P = {}>(
  Component: ComponentType<CreateIntegrationFetchProps & P>,
  INTEGRATION_SETUP_ID: string,
): ComponentType<P> {
  return (props: P) => {
    const {
      createIntegration,
      data,
      ...createIntegrationProps
    } = useCreateIntegration(INTEGRATION_SETUP_ID)

    return (
      <Component
        {...props}
        fetch={createIntegration}
        data={data.referenceId}
        {...createIntegrationProps}
      />
    )
  }
}
