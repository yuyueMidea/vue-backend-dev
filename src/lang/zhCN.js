/*
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-11 10:42:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\lang\zhCN.js
 */
import zhElement from 'element-ui/lib/locale/lang/zh-CN'

export default {
    global: {
        age: '年龄',
        username: '用户名',
        password: '密码',
        login: '登录',
        register: '注册',
        captcha: '验证码',
        getTel:'请输入手机号码',
        forgetPassword: '忘记密码？',
        loginTip: '获取短信验证码',
        editpassword: '修改密码',
        logout: '退出登录',
        errMsg: {
            inputRequired: '请输入{cont}',
            selectRequired: '请选择{cont}'
        }
    },
    ...zhElement
}