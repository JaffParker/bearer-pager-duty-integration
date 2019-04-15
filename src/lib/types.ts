export interface Policy {
  id: string
  summary: string
}

export interface EventResult {
  data: {
    status: 'success'
    message: string
    incident_key: string
  }
  referenceId?: string
}

export interface FetchProps<TReturnedData = any, TParams = any> {
  loading: boolean
  error?: any
  data?: TReturnedData
  fetch: (params: TParams) => Promise<TReturnedData>
}
