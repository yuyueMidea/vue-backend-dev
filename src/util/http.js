/*
 * @Author: your name
 * @Date: 2019-11-09 10:24:10
 * @LastEditTime: 2019-11-11 16:03:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\util\http.js
 */
import { Promise } from "core-js";
import axios from 'axios'
//
import { Loading } from 'element-ui';
let loadingInstance =null;

// 超时设置
// const service = axios.create({
//     // 请求超时时间
//     timeout: 5000                 
// });
// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
axios.interceptors.request.use(
    config => {
        loadingInstance = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
        return config
    },
    err => {
        return Promise.reject(err);
    }
);
axios.interceptors.response.use(response =>{
	loadingInstance.close();
    return response;
  }, error =>{
	loadingInstance.close();
    return Promise.reject(error);
  });

// 这是get方法
export function fetch(url, param={}){
    return new Promise((resolve, reject)=>{
        axios.get(url, {
                params: param
            })
            .then(responsData=>{
                resolve(responsData.data)
            }).catch(err=>{
                reject(err)
            })
    })
}

export function post(url, data={}){
    return new Promise((resolve, reject)=>{
        axios.post(url, data)
            .then(responsData=>{
                resolve(responsData.data)
            }).catch(err=>{
                reject(err)
            })
    })
}