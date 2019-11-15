<!--
 * @Author: your name
 * @Date: 2019-11-09 19:34:21
 * @LastEditTime: 2019-11-15 13:53:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\login\index.vue
 -->
<template>
    <div class="sys-login">
        <div class="login-area">
            <h2>注册时页面上的项目必填，登录时只需要手机号和密码</h2>
            <div class="form-group">
                <el-form :model="loginForm"  ref="loginForm" label-position="left" label-width="0px">
                    <el-form-item prop="name">
                        <el-input v-model="loginForm.name" type="text" :placeholder="$t('global.username')"></el-input>
                    </el-form-item>
                    <el-form-item prop="age">
                        <el-input v-model="loginForm.age" type="text" :placeholder="$t('global.age')"></el-input>
                    </el-form-item>
                    <el-form-item prop="age" style="background: #fff;padding-left:15px">
                        <el-radio v-model="loginForm.gender" label="1">男</el-radio>
                        <el-radio v-model="loginForm.gender" label="2">女</el-radio>
                    </el-form-item>
                    
                    <el-form-item prop="name">
                        <el-input v-model="loginForm.telphone" type="text" :placeholder="$t('global.getTel')"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input v-model="loginForm.password" type="password" :placeholder="$t('global.password')"></el-input>
                    </el-form-item>
                    <el-form-item prop="captcha" class="captcha">
                        <el-input v-model="loginForm.captcha" type="text" style="width:45%" class="the_yzm" :placeholder="$t('global.captcha')"></el-input>
                        <el-button type="primary" @click="getcaptcha" style="float:right">{{$t('global.loginTip')}}</el-button>
                    </el-form-item>
                    <a class="btn-login" type="primary" @click="register()">{{$t('global.register')}}</a>
                    <a class="btn-login" type="primary" @click="submitForm()">{{$t('global.login')}}</a>
                </el-form>
                <div v-if="sysMsg" class="err-msg">{{sysMsg}}</div>
            </div>
            <div class="lang-toggle">
                <span :class="{cur: lang=='zhCN'}" @click="changeLang('zhCN')">中</span> | 
                <span :class="{cur: lang=='en'}" @click="changeLang('en')">En</span>
            </div>
            <div class="lang-toggle">
                <span :class="{cur: theme=='theme-default'}" @click="changeTheme('theme-default')">浅</span> | 
                <span :class="{cur: theme=='theme-dark'}" @click="changeTheme('theme-dark')">深</span>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import setTheme from "@/util/setTheme"

export default {
    data() {
        return {
            loginForm: {
                age: '',
                gender: '1',
                name: '',
                telphone:'',
                password: '',
                captcha: ''
            },
            loginRules: {
                name: [
                    {required: true, message: '', trigger: 'blur'}
                ],
                password :[
                    {required: true, message: '', trigger: 'blur'}
                ],
                captcha: [
                    {required: false, message: '', trigger: 'blur'}
                ]
            },
           
            sysMsg: ''
        }
    },
    computed: {
        ...mapState({
            lang: state => state.lang,
            theme: state => state.theme
        })
    },
    // watch: {
    //     "captcha.show"(val){
    //         this.loginRules.captcha[0].required = val
    //     }
    // },
    beforeMount(){
        // 初始化错误信息。保证单独点击input时可以弹出正确的错误提示
        this.setErrMsg()
    },
    methods: {
        ...mapActions({
            login: 'auth/loginByEmail',
            loadLang: 'loadLang'
        }),
        getcaptcha(){//
            let param = new URLSearchParams()
            param.append("telphone", this.loginForm.name)
            this.$post("http://localhost:8080/user/getotp", param).then(res=>{
                if(res.status == "success"){
                    this.loginForm.captcha = res.data
                    this.$message.success(`短信验证码已经发送到了您的手机上，请注意查收!`)
                }
            })
        },
        register(){
            if(!this.loginForm.telphone || !this.loginForm.password|| !this.loginForm.name|| !this.loginForm.age|| !this.loginForm.captcha){
                return this.$message.error(`註冊失敗，頁面上的項目必填！`)
            }
            let param = new URLSearchParams()
            param.append("telphone", this.loginForm.telphone)
            param.append("password", this.loginForm.password)
            param.append("gender", this.loginForm.gender)
            param.append("age", this.loginForm.age)
            param.append("name", this.loginForm.name)
            param.append("otpCode", this.loginForm.captcha)
            // console.log(this.loginForm)
            this.$post("http://localhost:8080/user/register", param).then(res=>{
                if(res.status == "success"){
                    this.login({
                        name: this.loginForm.telphone,
                        password: this.loginForm.password
                    }).then(res => {
                        this.$message.success(`注册成功！`)
                        this.$router.push('home')
                    })
                } else {
                    this.$message.error(`注册失败！`)
                }
            })
        },
        submitForm(){
            if(!this.loginForm.telphone || !this.loginForm.password){
                return this.$message.error(`登录失败，用户名或密码错误！`)
            }
            let param = new URLSearchParams()
            param.append("telphone", this.loginForm.telphone)
            param.append("password", this.loginForm.password)
            this.$post("http://localhost:8080/user/login", param).then(res=>{
                if(res.status == "success"){
                    this.login({
                        name: this.loginForm.telphone,
                        password: this.loginForm.password,
                        id: res.data.id
                    }).then(res => {
                        this.$message.success(`登录成功！`)
                        this.$router.push('home')
                    })
                } else {
                    this.$message.error(`登录失败，用户名或密码错误！`)
                }
            })
                
        },
        changeLang(val){
            if(val == this.lang) return
            // 切换语言后重新加载语言包，并对重置登陆表单
            this.loadLang(val).then(() => {
                this.setErrMsg()
                this.$refs.loginForm.resetFields()
            })
        },
        changeTheme(val){
            if(val == this.lang) return
            setTheme(val)
            this.$store.commit("setThemeColor", val)
        },
        setErrMsg(){
            this.loginRules.name[0].message = this.$t('global.errMsg.inputRequired', {cont: this.$t('global.username')})
            this.loginRules.password[0].message = this.$t('global.errMsg.inputRequired', {cont: this.$t('global.password')})
            this.loginRules.captcha[0].message = this.$t('global.errMsg.inputRequired', {cont: this.$t('global.captcha')})
        }
    }
}
</script>
<style scoped>
.the_yzm .el-input__inner{
    width: 100% !important
}
</style>