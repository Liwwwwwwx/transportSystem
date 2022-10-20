// 手机号校验
export function checkPhone(rule, value, callback) {
  setTimeout(() => {
    if (value.length == 11 && /^1((34[0-8])|(8\d{2})|(([35][0-35-9]|4[579]|66|7[35678]|9[1389])\d{1}))\d{7}$/.test(value)) {
      callback()
    } else {
      callback(new Error('请输入正确的手机号'))
    }
  }, 1000)
}

// 姓名校验
export function checkName(rule, value, callback) {
  var reg = new RegExp("[\\u4E00-\\u9FFF]+", "g")
  setTimeout(() => {
    if (!reg.test(value)) {
      callback(new Error('请输入中文'))
    } else {
      if (value.length < 2) {
        callback(new Error('名字长度必须大于1'))
      } else {
        callback()
      }
    }
  }, 1000)
}
