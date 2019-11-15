/*
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-15 11:47:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\store\modules\user\index.js
 */

const state = {
    // 下单list
    orderList:[]
}

const mutations = {
    setOrderList: (state, data) => {
        state.orderList.push(data)
    },
}

export default {
    namespaced: true,
    state,
    mutations
}