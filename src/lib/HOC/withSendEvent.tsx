import React from 'react'
import { ComponentType } from 'react'
import { useSendEvent } from '../hooks/useSendEvent'
import { EventResult, FetchProps } from '../types'

export type SendEventProps = FetchProps<EventResult>

export function withSendEvent<P = any>(
  Component: ComponentType<SendEventProps & P>,
  INTEGRATION_SETUP_ID: string,
): ComponentType<P> {
  return (props: P) => {
    const { sendEvent, data, ...sendEventProps } = useSendEvent(
      INTEGRATION_SETUP_ID,
    )

    return (
      <Component
        data={data.eventResult}
        fetch={sendEvent}
        {...props}
        {...sendEventProps}
      />
    )
  }
}
