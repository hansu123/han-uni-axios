import $hUtils from './util/lodash'
import initConfig from './config/initConfig' // 初始配置
import dispatchRequest from './core/dispatchRequest'
import InterceptorManager from './core/interceptor'

// 核心构造函数
function UniAxios (initConfig) {
  this.config = initConfig || {}
  // 创建初始的拦截器
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  }
}

// 将get,post添加到原型上  .get({})
$hUtils.forEach(['get', 'post', 'put', 'delete'], method => {
  UniAxios.prototype[method] = function (config) {
    return this.request({ ...config, method })
  }
})

// request方法
UniAxios.prototype.request = function (config) {
  // 合并config
  config = { ...this.config, ...config }

  const chain = [dispatchRequest, undefined]

  this.interceptors.request.forEach(function (value) {
    chain.unshift(value.resolve, value.reject)
  })
  this.interceptors.response.forEach(function (value) {
    chain.push(value.resolve, value.reject)
  })

  let promise = Promise.resolve(config)
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }
  return promise
}

export default new UniAxios(initConfig)
