import $hUtils from './util/lodash'
export default {
  // 请求转化器,以前是写在请求拦截里面的,现在移植到这里
  transformRequestData: [
    function (data) {
      // 判断post提交数据中有没有对象，有对象则序列化对象
      $hUtils.forEach(data, (key, value) => {
        if (typeof (value) === 'object') {
          data[key] = JSON.stringify(value)
        }
      })
      return data
    }
  ],
  transformResponseData: [
    function (data) {
      return $hUtils.isJSONStr(data) ? JSON.parse(data) : data
    }
  ],
  // header的初始化配置
  header: {}
}
