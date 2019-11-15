<template>
    <div class="sys-header">
        <div class="logo">
            <slot name="logo"></slot>
        </div>
        <slot name="topnav"></slot>
        <div class="userInfo">
            <ul>
                <li>
                    <el-dropdown @command="userOperation">
                        <span class="user">{{username}}<i class="el-icon-caret-bottom el-icon--right"></i></span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="getUser">個人信息</el-dropdown-item>
                            <el-dropdown-item command="editPaw">{{$t('global.editpassword')}}</el-dropdown-item>
                            <el-dropdown-item command="logout">{{$t('global.logout')}}</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
                <li>
                    <span class="lang" :class="{cur: lang=='zhCN'}" @click="changeLang('zhCN')">中</span>
                    <span>/</span>
                    <span class="lang" :class="{cur: lang=='en'}" @click="changeLang('en')">EN</span>
                </li>
            </ul>
        </div>
        <el-dialog title="修改密码" :visible.sync="dialog.editPaw.show" :modal-append-to-body="false" :close-on-click-modal="false"
            append-to-body custom-class="editPawDialog">
            <el-form :model="editPaw" :rules="editPawRules" ref="editPaw" label-width="100px" >
                <el-form-item label="旧密码" prop="oldPaw">
                    <el-input v-model="editPaw.oldPaw" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPaw">
                    <el-input v-model="editPaw.newPaw" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认新密码" prop="confirmNewPaw">
                    <el-input v-model="editPaw.confirmNewPaw" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div class="textC">
                <el-button type="primary" @click="editPawSubmit">保存</el-button>
            </div>
        </el-dialog>

        <el-dialog title="個人信息" :visible.sync="userInfoDialog" :modal-append-to-body="false" custom-class="editPawDialog">
            <ul class="the_usermsg">
                <li v-for="(value, key, index) in usermsg" :key="key">
                    <span>{{ index }}. {{ key }}</span>
                    <span>{{ value }}</span>
                </li>
            </ul>
        </el-dialog>
    </div>
    
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
    data() {
        return {
            userInfoDialog:false,
            usermsg:{
                id:'',
                name:'',
                age:'',
                gender:'',
                telphone:'',
            },
            dialog: {
                editPaw: {
                    show: false
                }
            },
            editPaw: {
                oldPaw: '',
                newPaw: '',
                confirmNewPaw: ''
            },
            editPawRules: {
                oldPaw: [
                    {required: true, message: '请输入旧密码', trigger: 'blur'}
                ],
                newPaw: [
                    {required: true, message: '请输入新密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'},
                    {
                        // eslint-disable-next-line
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if(!/^[a-z0-9]+$/.test(value)) {
                                console.log("不符合输入规则")
                                errors.push("请输入字母或特殊字符")
                            }
                            callback(errors);
                        }
                    }
                ],
                confirmNewPaw: [
                    {required: true, message: '请再次输入新密码', trigger: 'blur'},
                    {min: 8, max: 20, message: '长度在 8 到 20 个字符', trigger: 'blur'},
                    {
                        // eslint-disable-next-line
                        validator(rule, value, callback, source, options) {
                            var errors = [];
                            if(!/^[a-z0-9]+$/.test(value)) {
                                console.log("不符合输入规则")
                                errors.push("请输入字母或特殊字符")
                            }
                            callback(errors);
                        }
                    }
                ]
            }
        }
    },
    computed: {
        ...mapState({
            username: state => state.user.name,
            userId: state => state.user.id,
            lang: state => state.lang
        })
    },
    methods: {
        ...mapActions({
            sysLogout: 'auth/logout',
            loadLang: 'loadLang'
        }),
        changeLang(val) {
            if (val == this.lang) return
            // 改变语言后，因为表单校验的错误提示或者后台返回的信息等问题，需要进行页面刷新
            this.loadLang(val).then(() => {
                window.location.reload()
            })
        },
        userOperation(command){
            switch(command){
                case 'logout': 
                    this.logout()
                    break
                case 'editPaw':
                    this.dialog.editPaw.show = true
                    console.log('编辑密码')
                    break
                case 'getUser':
                    this.getUser()
                    break
            }
        },
        getUser(){
            let param = new URLSearchParams()
            param.append("id", this.userId)
            this.$post("http://localhost:8080/user/get", param).then(res=>{
                if(res.status == "success"){
                    this.userInfoDialog =true
                    for(let i in this.usermsg){
                        this.usermsg[i] = res.data[i]
                    }
                }
            })
        },
        logout() {
            this.sysLogout().then(() => {
                this.$router.push('/login')
            })
        },
        editPawSubmit(){
            this.$refs.editPaw.validate((valid) => {
                if (valid) {
                    console.log("修改密码表单提交")
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}
</script>
<style scoped>
.the_usermsg li{
    border-bottom: 1px solid #ccc; padding: 3px 6px;  margin: 3px
}
.the_usermsg li span:nth-child(1){
    border-right: 1px solid #ccc; width: 150px;display: inline-block;
}

</style>