import { HeadersInit } from "node-fetch"

export class HttpClient {
  private lastErrors = new Map<string, any>()

  getAndDeleteLastError<TError>(method: string, url: string): TError | undefined {
    const key = `${method}:${url}`
    let error = undefined
    if (this.lastErrors.has(key)) {
      error = this.lastErrors.get(key)
      this.lastErrors.delete(key)
    }
    return error
  }

  rewriteLastError(method: string, url: string, data: any): void {
    const key = `${method}:${url}`
    this.lastErrors.delete(key)
    this.lastErrors.set(key, data)
  }

  async get<TData = any>(url: string, headers?: HeadersInit): Promise<TData | undefined> {
    return await this.sendRequest<TData>(url, 'GET', headers, undefined)
  }

  async post<TData = any>(url: string, data?: string, headers?: HeadersInit): Promise<TData | undefined> {
    return await this.sendRequest<TData>(url, 'POST', headers, data)
  }

  async put<TData = any>(url: string, data?: string, headers?: HeadersInit): Promise<TData | undefined> {
    return await this.sendRequest<TData>(url, 'PUT', headers, data)
  }

  async delete<TData = any>(url: string, data?: string, headers?: HeadersInit): Promise<TData | undefined> {
    return await this.sendRequest<TData>(url, 'DELETE', headers, data)
  }

  async sendRequest<TData>(url: string, method: string, headers?: HeadersInit, body?: string): Promise<TData | undefined> {
    const headersObject: HeadersInit = {
      ...headers,
      'Content-Type': 'application/json',
    }
    const response = await fetch(url, { method, headers: {...headersObject}, body })
    let data = {}
    try {
      data = await response.json()
    } catch (e) { }
    if (!response.ok && data !== {}) {
      this.rewriteLastError(method, url, data)
    }
    return response.ok ? data as TData : undefined
  }
}
