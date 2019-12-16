import $hUtils from './util/lodash'
// 拦截器函数
class InterceptorManager {
  constructor () {
    this.handlers = []
  }

  use (resolve, reject) {
    this.handlers.push({
      resolve,
      reject
    })
  }

  forEach (fn) {
    $hUtils.forEach(this.handlers, value => {
      fn(value)
    })
  }
}
export default InterceptorManager
