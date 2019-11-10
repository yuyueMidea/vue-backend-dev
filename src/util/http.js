/*
 * @Author: your name
 * @Date: 2019-11-09 19:49:10
 * @LastEditTime: 2019-11-10 16:31:50
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\util\http.js
 */
import axios from 'axios'

import { Loading } from 'element-ui';
let loadingInstance =null;
axios.interceptors.request.use( (config)=> {
    // Do something before request is sent
	if(config.showLoading){
		loadingInstance = Loading.service({
				  lock: true,
				  text: 'Loading',
				  spinner: 'el-icon-loading',
				  background: 'rgba(0, 0, 0, 0.7)'
	    });
	}
    return config;
  }, (error)=> {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use((response)=> {
	if(response.config.showLoading){
		 loadingInstance.close();
	}
    return response;
  }, (error)=> {
	  if(error.config.showLoading){
	  	 loadingInstance.close();
	  }
    // Do something with response error
    return Promise.reject(error);
  });


export function fetch(url,param={}){
    return new Promise((resolve,reject)=>{
        axios.get(url, {params:param})
        .then(resData=>{
            resolve(resData.data)
        }).catch(err=>{
            reject(err)
        })
    })
}

export function post(url,param={}){
    return new Promise((resolve,reject)=>{
        axios.post(url, param).then(resData=>{
            resolve(resData.data)
        }).catch(err=>{
            reject(err)
        })
    })
}