/**
 * 
 * @param {日期} date 
 * @returns 日期字符串
 */
export function dateToString(date) {
  var year = date.getFullYear();//年
  var month = date.getMonth();//月
  var day = date.getDate();//日

  return year + "-" +
    ((month + 1) > 9 ? (month + 1) : "0" + (month + 1)) + "-" +
    (day > 9 ? day : ("0" + day));
}

/**
 * 
 * @param {日期字符串} str 
 * @returns 日期
 */
export function stringToDate(str) {
  return new Date(str)
}