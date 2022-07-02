/**
 *
 * @param params 去掉参数中的空字符串和undefined，如果不是空字符串则trim()
 */
export function deleteEmptyStringAndTrim (params: Array<any> | object) {
  // 先进行类型检测
  if (Array.isArray(params)) {

  } else if (Object.prototype.toString.call(params) === '[object Object]') {

  }
}
