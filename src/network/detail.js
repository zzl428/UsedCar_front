import {request} from './request'

// 获取商品详情数据
export function goodsDetail(id, user_id){
  return request({
    method: 'get',
    url:`/front/detail/${id}`,
    params: {
      user_id
    }
  })
}

// 添加收藏
export function addcollect(id){
  return request({
    method: 'post',
    url:`/front/detail/${id}`,
  })
}