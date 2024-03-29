import {AxiosRequestConfig, AxiosPromise, AxiosResponse} from './types'
import xhr from './xhr'
import { buildURL } from "./helpers/url";
import { transformRequest, transformResponse } from './helpers/data'
import { processHeaders } from './helpers/header'


function axios(config: AxiosRequestConfig): AxiosPromise {
  processConfig(config)
  return xhr(config).then((res) => {
    return transformResponseData(res)
  })

}

function processConfig(config: AxiosRequestConfig): void {
  config.url = transfromURL(config);
  config.headers = transformHeaders(config)
  config.data = transformRequestData(config)

}

function transfromURL(config: AxiosRequestConfig): string {
  const {url, params} = config
  return buildURL(url, params)
}

function transformRequestData (config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {} , data} = config
  return processHeaders(headers, data)

}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data)
  return res

}

export default axios
