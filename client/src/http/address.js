import {requestAddress} from './request';

const AK = 'jVW1XvGAUlGGpSrWQt4WTeuLVGVU0GDY'
const URL = 'api_region_search/v1'

export function getAddress(keyword, sub_admin) {
  return requestAddress({
    url:`${URL}/?keyword=${keyword}&sub_admin=${sub_admin}&ak=${AK}`
  })
}