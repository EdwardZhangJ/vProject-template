import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { MyInternalRequestConfig, MyRequestConfig } from './type.ts'

// 拦截器 蒙版Loading/token/修改配置
class Request {
  instance: AxiosInstance;
  // request示例 => axios实例
  constructor(config: MyRequestConfig) {
    this.instance = axios.create(config)

    // 每个instance都拦截器
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        
        return config;
      }, (error: AxiosError) => {
        return Promise.reject(error)
      })

    // 响应拦截
    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        const { data } = res
        // 处理res.code
        return data;
      }, (error: AxiosError) => {
        const { message } = error
        // 根据message 和status处理错误
        this.handleErrorMessage(message)
        return Promise.reject(error)
      })
    // 针对具有自定义拦截器的config
    this.instance.interceptors.request.use(
      config.interceptors?.requestSuccessInterceptor,
      config.interceptors?.requestFailInterceptor
    )
    this.instance.interceptors.response.use(
      config.interceptors?.responseSuccessInterceptor,
      config.interceptors?.responseFailInterceptor
    )
  }

  // 封装错误消息处理
  handleErrorMessage(message: string) {

  }

  // 封装网络请求方法
  request<T = any>(config: MyRequestConfig<T>) {
    // 单次拦截器
    if (config.interceptors?.requestSuccessInterceptor) {
      config = config.interceptors.requestSuccessInterceptor(config as MyInternalRequestConfig)
    }
    return new Promise<T>((resolve, reject) => {
      try {
        // 在尝试发送请求之前，捕获可能的配置错误
        this.instance.request<any, T>(config).then(res => {
          if (config.interceptors?.responseSuccessInterceptor) {
            res = config.interceptors.responseSuccessInterceptor(res)
          }
          resolve(res)
        }).catch(error => {
          if (config.interceptors?.responseFailInterceptor) {
            error = config.interceptors.responseFailInterceptor(error)
          }
          reject(error)
        })
      } catch (e: any) {
        if (config.interceptors?.requestFailInterceptor) {
          const modifiedError = config.interceptors.requestFailInterceptor(e)
          return Promise.reject(modifiedError)
        } else {
          return Promise.reject(e)
        }
      }

    })
  }

  // 封装常用方法
  get<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: "GET" })
  }
  post<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: "POST" })
  }
  put<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: "PUT" })
  }
  delete<T = any>(config: MyRequestConfig<T>) {
    return this.request({ ...config, method: "DELETE" })
  }
}


export default Request;
