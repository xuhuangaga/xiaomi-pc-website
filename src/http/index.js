import axios from 'axios'
import {Message} from 'view-design';
import router from '../router'

const http = axios.create({
  timeout: 1000,
  baseURL: 'http://localhost:5000'
})

//请求拦截
http.interceptors.request.use((config) => {
  let token = localStorage.getItem('token')
  if (token) {
    // headers属性是后端约定的
    config.headers['Authorization'] = token
  }
  return config
}, (err) => {
  return Promise.reject(err)
})

//响应拦截
http.interceptors.response.use(res => {
  return res.data
}, (err) => {
  let status = err.response.status
  switch (status) {
    case 400:
      Message.error('参数错误')
      break;
    case 401:
      Message.error('登录时间过长,请重新登录')
     setTimeout(()=>{
      router.push('/login')
     },1000)
      break;
    case 403:
      Message.error('没有权限')
      break
    case 404:
      Message.error('路径错误')
      break
    case 500:
      Message.error('服务器错误')
      break
    case 503:
      Message.error('服务器维护')
      break;
  }
  return Promise.reject(err)
})


export default http