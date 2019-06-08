import {isDate, isPlainObject} from './util'

function encode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/ig, ':')
    .replace(/$24/g, '$')
    .replace(/%2c/ig, ',')
    .replace(/%20/g, '+')
    .replace(/%5b/ig, '[')
    .replace(/%5d/ig, ']')
}

export function buildURL (url: string, params?: any): string {
  if(!params) {
    return url
  }

  const parts: String[] =[]
  Object.keys(params).forEach((key) => {
    const val = params[key]
    if(val === null) {
      return
    }
    let values = []
    if(Array.isArray(val)) {
      values = val
      key += '[]'
    } else {
      values = [val]  // 变成数组
    }
    values.forEach((val) => {
      if(isDate(val)) {
        val = val.toISOString()
      } else if (isPlainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push (`${encode(key)}=${encode(val)}`)
    })
  })

  let serializedParams = parts.join("&")
  if(serializedParams) {
    const markIndex = url.indexOf('#')
    if(-1 !== markIndex) {
      url = url.slice(0, markIndex) //去除哈希
    }
    url += (url.indexOf('?')===-1 ? '?' : '&') + serializedParams // 处理了url已有部分参数的情况
  }
  return url
}