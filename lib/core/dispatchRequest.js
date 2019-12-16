import $hUtils from '../util/lodash'
import createError from '../core/createError'
function dispatchRequest (config) {
  // 添加请求转换器
  config.transformRequestData.forEach(fn => {
    config.data = fn(config.data)
  })

  if (config.baseURL) {
    config.url = $hUtils.mergeUrl(config.baseURL, config.url)
  }

  // 相当于xhr.js
  return new Promise((resolve, reject) => {
    uni.request({
      ...config,
      // 相当于settle.js
      success: res => {
        // 添加响应转换器
        if (res.statusCode.toString().startsWith('2')) {
          config.transformResponseData.forEach(fn => {
            res.data = fn(res.data)
          })
          resolve({ ...res, config })
        } else {
          const errMsg = config.catchErr(res.statusCode, res)
          const resError = createError(errMsg, null, config, res)
          reject(resError)
        }
      },
      fail: err => {
        const errMsg = err.errMsg === 'request:fail' ? '请求已超时' + config.timeout + 'ms' : ''
        const resError = createError(errMsg, 'timeout', config)
        reject(resError)
      }
    })
  })
}
export default dispatchRequest
