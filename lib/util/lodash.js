// 封装数组和对象的遍历
function forEach (obj, fn) {
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
    console.warn('target is not an object')
  }
}
// 是否是JSON字符串
function isJSONStr (str) {
  try {
    if (JSON.parse(str) instanceof Object) {
      return true
    }
  } catch (error) {
    return false
  }
}
function mergeUrl (baseURL, targetUrl) {
  return baseURL + targetUrl
}
function merge (...args) {
  const newObj = {}
  return args.reduce((prev, curr) => {
    forEach(curr, (value, key) => {
      if (prev[key]) {
        if (typeof prev[key] === 'object') {
          newObj[key] = merge(prev[key], value)
        } else {
          newObj[key] = value
        }
      } else {
        newObj[key] = value
      }
    })
    return newObj
  }, newObj)
}

export default {
  forEach,
  isJSONStr,
  mergeUrl,
  merge
}
