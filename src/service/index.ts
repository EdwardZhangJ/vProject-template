import { BASEURL, TIMEOUT } from "./config/carbon";
import Request from "./request";


const createRequest = new Request({
  baseURL: BASEURL,
  timeout: TIMEOUT,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  },
  interceptors: {
    requestSuccessInterceptor: (config) => {
      return config
    },
    requestFailInterceptor: (error) => {
      return error;
    },
    responseSuccessInterceptor: (res) => {
      return res
    },
    responseFailInterceptor: (error) => {
      return error;
    }
  }
})


export * from './api'

export {
  createRequest,
}
