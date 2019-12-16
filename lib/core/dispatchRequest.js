import $hUtils from './util/lodash'
import throwErr from './config/throwErr' // 错误处理配置
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
          const errorMsg = throwErr(res.statusCode, res)
          reject(errorMsg)
        }
      },
      fail: err => {
        let errorMsg
        if (err.errMsg === 'request:fail') {
          errorMsg = '请求已超时' + config.timeout + 'ms'
        }
        reject(errorMsg)
      }
    })
  })
}
export default dispatchRequest
