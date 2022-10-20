import {request} from './request';

class User {
  getOne(userName){
    return request({
      url:`/user?username=${userName}`,
      method:'GET'
    })
  }
}

export default new User