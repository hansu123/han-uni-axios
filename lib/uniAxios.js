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

  config.method = config.method ? config.method : 'get' // 初始设置为get

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

// 工厂函数，创建和UniAxios实例功能差不多的一个方法
function createInstance (config) {
  const context = new UniAxios(config)
  const instance = UniAxios.prototype.request.bind(context)
  $hUtils.forEach(UniAxios.prototype, (key, value) => {
    if (typeof value === 'function') {
      instance[key] = value.bind(context)
    } else {
      instance[key] = value
    }
  })
  $hUtils.forEach(context, (key, value) => {
    instance[key] = value
  })
  return instance
}

const uniAxios = new UniAxios(initConfig)

uniAxios.create = function (config = {}) {
  return createInstance({ ...this.config, ...config })
}

export default uniAxios
