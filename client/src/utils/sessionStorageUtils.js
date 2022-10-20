export function saveSessionData(key,data) {
  sessionStorage.setItem(key,JSON.stringify(data))
}

export function getSessionData(key) {
  var data = sessionStorage.getItem(key)
  return data ? JSON.parse(data) : []
}
