export function saveData(key,data) {
  localStorage.setItem(key,JSON.stringify(data))
}

export function getData(key) {
  var data = localStorage.getItem(key)
  return data ? JSON.parse(data) : []
}

export function deleteData(key) {
  localStorage.removeItem(key)
}

export function clearData() {
  localStorage.clear()
}