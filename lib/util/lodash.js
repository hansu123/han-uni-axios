export default {
  forEach (obj, fn) {
    if (typeof (obj) === 'object') {
      if (Array.isArray(obj)) {
        obj.forEach(elem => {
          fn(elem)
        })
      } else {
        Object.keys(obj).forEach(elem => {
          fn(elem, obj[elem])
        })
      }
    } else {

    }
  },
  // 是否是JSON字符串
  isJSONStr (str) {
    try {
      if (JSON.parse(str) instanceof Object) {
        return true
      }
    } catch (error) {
      // console.log(error)
      return false
    }
  },
  mergeUrl (baseURL, targetUrl) {
    return baseURL + targetUrl
  }
}
