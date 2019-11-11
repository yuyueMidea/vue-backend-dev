/*
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-11 14:10:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\store\modules\user\index.js
 */
import Cookies from 'js-cookie'

const state = {
    // 用户名
    name: '',
    id:''
}

const mutations = {
    setName: (state, data) => {
        if(data){
            Cookies.set('userName', encodeURIComponent(data), {
                expires: 365
            })
        } else {
            Cookies.remove('userName')
        }
        state.name = data
    },
    setId: (state,data) =>{
        if(data){
            Cookies.set('userId', encodeURIComponent(data), {
                expires: 365
            })
        } else {
            Cookies.remove('userId')
        }
        state.id = data
    }
}

export default {
    namespaced: true,
    state,
    mutations
}