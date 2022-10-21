import axios from 'axios';

export function request({
  url,
  method = "GET",
  data
}) {
  return new Promise((resolve, reject) => {
    let options = {
      url,
      method,
      data
    }

    var instance = axios.create({
      baseURL: '/api',
      timeout: 5000,
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
      }
    })

    return instance(options)
      .then(res => resolve(res.data))
      .catch(error => reject(error))
  })
}

export function requestAddress({
  url,
  method = "GET",
  data
}) {
  return new Promise((resolve, reject) => {
    let options = {
      url,
      method,
      data
    }

    var instance = axios.create({
      baseURL: '/test',
      timeout: 5000,
      withCredentials: true,
      headers: {
        'content-type': 'application/json',
      }
    })

    return instance(options)
      .then(res => resolve(res.data))
      .catch(error => reject(error))
  })
}