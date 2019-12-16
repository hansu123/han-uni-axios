// 创建error实例，将一些重要信息放入error中
function createError (errMsg, code, config, res) {
  const resError = new Error(errMsg)
  resError.config = config
  resError.errMsg = errMsg
  resError.code = code
  return resError
}
export default createError
