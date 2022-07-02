import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

export interface IDataType<T = any> {
  msg: string
  code: number
  data: T
}

class Http {
  instance: AxiosInstance | undefined;

  constructor (config: AxiosRequestConfig) {
    this.instance = axios.create(config)
  }

  request<T> (config: AxiosRequestConfig): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.instance?.request<any, T>(config)
        .then(resolve)
        .catch(reject)
    })
  }

  get<T = any> (config: AxiosRequestConfig): Promise<IDataType<T>> {
    return this.request<IDataType<T>>({
      ...config,
      method: 'get'
    })
  }

  post<T = any> (config: AxiosRequestConfig): Promise<IDataType<T>> {
    return this.request<IDataType<T>>({
      ...config,
      method: 'post'
    })
  }

  put<T = any> (config: AxiosRequestConfig): Promise<IDataType<T>> {
    return this.request<IDataType<T>>({
      ...config,
      method: 'put'
    })
  }

  delete<T = any> (config: AxiosRequestConfig): Promise<IDataType<T>> {
    return this.request<IDataType<T>>({
      ...config,
      method: 'delete'
    })
  }
}

export default Http
