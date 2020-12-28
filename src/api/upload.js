/*
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-25 17:24:12
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-28 11:25:22
 */
import request from '../libs/request'

/**
 * 获取图片url地址
 * @param data
 */
export const getImgUrl = (data) => {
  return request({
    url: '/uploadFormData',
    data,
    method: 'post',
    cType: 'multipart/form-data'
  })
}