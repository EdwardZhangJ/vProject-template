//request/type.ts
import { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';;

// 针对AxiosRequestConfig进行扩展
export interface MyInterceptors<T = AxiosResponse> {
  requestSuccessInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  requestFailInterceptor?: (error: AxiosError) => AxiosError;
  responseSuccessInterceptor?: (res: T) => T;
  responseFailInterceptor?: (error: AxiosError) => AxiosError;
}
export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyInterceptors<T>;
}

export interface MyInternalRequestConfig extends InternalAxiosRequestConfig {
  interceptors?: MyInterceptors;
}


