/*
 * @Description: 
 * @Version: 1.0
 * @Autor: longyunfei
 * @Date: 2020-12-28 11:10:35
 * @LastEditors: longyunfei
 * @LastEditTime: 2020-12-28 11:46:55
 */
import axios from 'axios'
import qs from 'qs'
// import config from '@/config'
import { Message } from 'element-ui';

// const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const baseUrl = '你的上传文件接口'
/**
 * 创建axios实例
 * @type {AxiosInstance}
 */
const service = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 30000 // 设置请求超时时间30s
})
/**
 * 请求参数处理
 */
service.interceptors.request.use((config) => {
  if (config.cType) {
    config.headers.post['Content-Type'] = config.cType
  } else {
    config.method === 'post'
      ? config.data = qs.stringify({ ...config.data })
      : config.params = { ...config.params }
  }
  return config
}
)
/**
 * 响应结果处理
 */
service.interceptors.response.use(
  (response) => {
    if (response.data.code !== 0) {
      Message.error(response.data.msg)
      return Promise.reject(response.data.msg)
    } else {
      console.log('----------------------------------')
      return Promise.resolve(response.data)
    }
  }, error => {
    let message = ''
    if (error && error.response) {
      message = error.response.data.message == null || error.response.data.message == undefined ? error.response.data.msg : '服务器错误'
      Message.error(message)
      // 请求错误处理
      return Promise.reject(error)
    } else {
      message = '连接服务器失败'
      Message.error(message)
      return Promise.reject(error)
    }
  }
)

export default service
