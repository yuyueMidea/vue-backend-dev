<!--
 * @Author: your name
 * @Date: 2019-03-14 14:00:10
 * @LastEditTime: 2019-11-16 17:09:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-backend-dev\src\page\example\table.vue
 -->
<template>
    <div class="sys-page">
        <p>GitHub接口系列</p>
        <p>
            <el-button  type="primary" @click="openAPI">打开GitHub相关的API</el-button>
        </p>
        <p>
            <el-input v-model="user" style="width:22%">
                          <el-button slot="append" icon="el-icon-edit-outline" type="primary"
                            @click="getuserData">获取用户</el-button>
                    </el-input>
                    <el-input v-model="repository" style="width:22%">
                          <el-button slot="append" icon="el-icon-edit-outline" type="primary"
                            @click="getReposData">获取仓库</el-button>
                    </el-input>
        <!-- </p>
        <p> -->
          <el-pagination @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage2"
            :page-sizes="[10, 20, 60, 100]"
            :page-size="per_page"
            style="display: inline-block;"
            layout="sizes, prev, pager, next"
            :total="allTotal"/>
      </p>
        <ul class="the_git_user">
            <li v-for="(v,k) in userListData" :key="k">
                <a :href="v.html_url" target="_blank">
                    <img :src="v.avatar_url" alt="">
                </a>
                <span :title="v.login">{{v.login}}</span>
            </li>
        </ul>
        <hr>
        <ul class="the_git_repo">
            <li v-for="(v,k) in reposListData" :key="k">
                <a :href="v.html_url" target="_blank">{{v.full_name}}</a>
                <span>{{v.description}}</span>
                <span :title="v.login">{{v.login}}</span>
                <span style="color:green">[start---{{v.stargazers_count}}]</span>
            </li>
        </ul>
        <!-- 表格体 -->
            <!-- <el-table :data="tableData" border stripe highlight-current-row>
                <el-table-column width="50" type="selection" />
                <el-table-column type="index" width="50"/>
                <el-table-column prop="id" label="ID" sortable width="70" />
                <el-table-column prop="city" label="城市" sortable />
                <el-table-column prop="district" label="区县" sortable />
                <el-table-column prop="area" label="乡镇" sortable />
                <el-table-column prop="xiaoqu" label="小区" sortable />
                <el-table-column prop="price" label="价格" sortable />
                <el-table-column prop="sale" label="销量" sortable />
            </el-table> -->
    </div>
</template>

<script>
export default {
    name: 'userList',
    data() {
        return {
            user: '',
            repository:'',
            per_page: 10,
            userListData:  [],
            reposListData:[],
            tableData:  [],
            currentPage2: 1,
            allTotal: 0,
        }
    },
    mounted() {
        this.getuserData()
    },
    methods: {
       
       openAPI(){
           window.open('https://api.github.com/')
       },
        // 获取user数据
        getuserData() {
            if(!this.user) return
            let obj ={
                q: this.user,
                page: this.currentPage2,
                per_page: this.per_page
            }
            this.$get("https://api.github.com/search/users", obj).then(res => {
                // debugger
                this.userListData = res.items
                this.allTotal = res.total_count;
            })
        }, 
        // 获取user数据
        getReposData() {
            debugger
            if(!this.repository) return
            let obj ={
                q: this.repository,
                page: this.currentPage2,
                per_page: this.per_page
            }
            this.$get("https://api.github.com/search/repositories", obj).then(res => {
                // debugger
                this.reposListData = res.items
                this.allTotal = res.total_count;
            })
        },
        handleSizeChange(val){
            this.per_page =val;
            this.getuserData()
            this.getReposData()
        },
        handleCurrentChange(val){
            this.currentPage2 =val
            this.getuserData()
            this.getReposData()
        },
    }
}
</script>
<style scoped>
.the_git_user li{
    float: left; width: 100px; height: 100px;
    border: 1px solid #ccc; padding: 3px; margin: 11px;
    overflow: hidden
}

.the_git_user li a {
    text-align: center;
    display: block;
}
.the_git_user li a img{
    width: 90px; height: 80px;
}
.the_git_repo li{
    float: left; width: 48%; height: 45px;
    border: 1px solid #ccc; padding: 5px; margin: 3px;
    overflow: hidden
}
</style>
