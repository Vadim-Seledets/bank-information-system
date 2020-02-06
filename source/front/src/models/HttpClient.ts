import { HeadersInit } from "node-fetch"

export interface Response<TData, TErrorData> {
  data: TData | undefined
  errorData: TErrorData | undefined
  successful: boolean
}

export class HttpClient {
  async get<TData = any, TErrorData = any>(url: string, headers?: HeadersInit): Promise<Response<TData, TErrorData>> {
    return await this.sendRequest<TData, TErrorData>(url, 'GET', headers, undefined)
  }

  async post<TData = any, TErrorData = any>(url: string, data?: string, headers?: HeadersInit): Promise<Response<TData, TErrorData>> {
    return await this.sendRequest<TData, TErrorData>(url, 'POST', headers, data)
  }

  async put<TData = any, TErrorData = any>(url: string, data?: string, headers?: HeadersInit): Promise<Response<TData, TErrorData>> {
    return await this.sendRequest<TData, TErrorData>(url, 'PUT', headers, data)
  }

  async delete<TData = any, TErrorData = any>(url: string, data?: string, headers?: HeadersInit): Promise<Response<TData, TErrorData>> {
    return await this.sendRequest<TData, TErrorData>(url, 'DELETE', headers, data)
  }

  async sendRequest<TData, TErrorData>(url: string, method: string, headers?: HeadersInit, body?: string): Promise<Response<TData, TErrorData>> {
    const response = await fetch(url, {
      method,
      ...headers,
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    let responseData = {}
    try {
      responseData = await response.json()
    } catch (e) {}
    const successful = response.ok
    return {
      data: successful ? responseData as TData : undefined,
      errorData: successful ? undefined : responseData as TErrorData,
      successful,
    }
  }
}
